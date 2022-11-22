//adding new data to database
let items = [];
function addtodb(data) {
  db.collection("todoItems")
    .add({
      text: data,
      status: "active",
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}
// getting updated data from database
function getfromdb() {
  db.collection("todoItems").onSnapshot((snapshot) => {
    // console.log(snapshot.docs);
    snapshot.docs.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    createitems(items);
    // console.log("hello 1");
    items = [];
  });
  // console.log("hello 2");
}
// updating the local data with database
function createitems(arrItems) {
  let itemsHtml = "";
  arrItems.forEach((item, index) => {
    itemsHtml += `<tr>
                    <th scope="row">${index + 1}</th>
                        <td class=" ${
                          item.status == "completed"
                            ? "text-decoration-line-through opacity-25"
                            : ""
                        }">${item.text}</td>
                        <td >${
                          item.status == "active" ? "in progress" : "completed"
                        }</td>
                        <td data-id="${item.id}">
                            <button type="submit" class="btn btn-danger delete">Delete</button>
                            <button type="submit" class="btn btn-success ms-1 finished">${
                              item.status == "active"
                                ? "Mark finished"
                                : "mark Unfinished"
                            }</button>
                        </td>
                    </tr>`;
  });
  document.getElementById("mylist").innerHTML = itemsHtml;
  delete_event();
  mark_complete();
}
// deleting data in database
function delete_event() {
  const delete_items = document.getElementsByClassName("delete");

  for (const item of delete_items) {
    item.onclick = (e) => {
      const id = e.target.parentElement.dataset.id;

      deleteindb(id);
    };
  }
}
function deleteindb(id) {
  db.collection("todoItems")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}

getfromdb();
// complete or progress changer
function mark_complete() {
  const finished_btn = document.getElementsByClassName("finished");

  for (const item of finished_btn) {
    item.onclick = (e) => {
      const id = e.target.parentElement.dataset.id;
      checkUncheck(id);
    };
  }
}
function checkUncheck(id) {
  let item = db.collection("todoItems").doc(id);
  item.get().then((doc) => {
    if (doc.exists) {
      const status = doc.data().status;
      if (status === "active") {
        item.update({
          status: "completed",
        });
      } else if (status === "completed") {
        item.update({
          status: "active",
        });
      }
    }
  });
}

function newElement(event) {
  event.preventDefault();
  const inputValue = document.getElementById("myInput").value;

  //   console.log(inputValue);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    addtodb(inputValue);
  }
  document.getElementById("myInput").value = "";
}
