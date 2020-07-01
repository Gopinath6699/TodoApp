var firebaseConfig = {
  apiKey: "AIzaSyB-ZIpHUTlDW5bcfLauI3naimDaD3jWvzQ",
  authDomain: "todoapp-4ed85.firebaseapp.com",
  databaseURL: "https://todoapp-4ed85.firebaseio.com",
  projectId: "todoapp-4ed85",
  storageBucket: "todoapp-4ed85.appspot.com",
  messagingSenderId: "730471602000",
  appId: "1:730471602000:web:c36890e294f88f5e9afe55",
  measurementId: "G-H3SXK1NNLR",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var firebaseRef = firebase.database().ref();

function viewDetails() {
  var data = firebase.database().ref("Tasks/");

  data.on("child_added", function (snapshot) {
    var Done, checked;
    var key = snapshot.key;
    var val = snapshot.child("taskName").val();
    var isDone = snapshot.child("isDone").val();
    var stikeOut = snapshot.child("stikeOut").val();
    var id = "id" + Math.random().toString(10).slice(2);
    var group_id = "id" + Math.random().toString(15).slice(2);
    var check_id = "id" + Math.random().toString(20).slice(2);
    var done_id = "id" + new Date().getTime();
    var edit_id = "id" + Math.random().toString(20).slice(2);
    var isEditActive = true;
    var taskEdit = "";
    // console.log(check_id);

    $(".add-task").append(
      '<a href="#" id="' +
        group_id +
        '" class="list-group-item list-group-item-action"><div class="d-flex custom-control custom-checkbox my-1 mr-sm-2"><input type="checkbox" ' +
        isDone +
        ' class="custom-control-input" id="' +
        done_id +
        '"><label class="custom-control-label px-5 mr-5 " style="text-decoration: ' +
        stikeOut +
        '" id="' +
        check_id +
        '" for="' +
        done_id +
        '"> ' +
        val +
        ' </label><div class="ml-auto" id="' +
        edit_id +
        '"><button class="btn btn-sm btn-info" href="#"><i class="fa fa-edit mr-2"></i> Edit</button></div><div class="ml-4" id="' +
        id +
        '"><button class="btn btn-sm btn-danger del_btn" href="#"><i class="fa fa-trash mr-2"></i> Delete</button></div></div></a>'
    );

    $("#" + edit_id).click(function () {
      if (isEditActive) {
        isEditActive = false;
        taskEdit = document.getElementById(check_id).innerHTML;
        //   console.log(taskEdit);

        $("#" + check_id).html(
          "<input id='update_" +
            check_id +
            "' class='form-control' type='text' value='" +
            taskEdit +
            "' />"
        );

        document.getElementById(edit_id).innerHTML =
          '<button id="update_' +
          edit_id +
          '" class="btn btn-sm btn-info" href="#"><i class="fa fa-check mr-2"></i> Update</button>';

        document.getElementById(id).innerHTML =
          '<button id="updateCancel_' +
          id +
          '" class="btn btn-sm btn-danger del_btn" href="#"><i class="fa fa-times mr-2"></i> Cancel</button>';
      } else {
        console.log("hello");
        var updateTask = document.getElementById("update_" + check_id).value;
        console.log(updateTask);
        document.getElementById(check_id).innerHTML = updateTask;
        var newTask = firebaseRef.child("Tasks/" + key);
        newTask.child("taskName").set(updateTask);
        document.getElementById(edit_id).innerHTML =
          '<button class="btn btn-sm btn-info" href="#"><i class="fa fa-edit mr-2"></i> Edit</button>';

        document.getElementById(id).innerHTML =
          '<button class="btn btn-sm btn-danger del_btn" href="#"><i class="fa fa-trash mr-2"></i> Delete</button>';
        isEditActive = true;
      }
    });

    data.on("value", function (snapshot) {
      var totalTask = snapshot.numChildren();
      var taskLeft = 0,
        taskCompleted = 0;

      snapshot.forEach(function (childSnapshot) {
        var taskDone = childSnapshot.child("isDone").val();
        if (taskDone == "checked") {
          taskCompleted++;
        }
      });
      taskLeft = totalTask - taskCompleted;
      $(".task_monitor").html(
        '<p class="mr-auto">TOTAL TASK: <button class="btn btn-primary btn-sm">' +
          totalTask +
          '</button></p><p class="ml-auto">TASK LEFT: <button class="btn btn-warning btn-sm">' +
          taskLeft +
          '</button></p> <p class="ml-5">TASK COMPLETED: <button class="btn btn-success btn-sm">' +
          taskCompleted +
          "</button></p>"
      );
    });

    document.getElementById(id).addEventListener("click", () => {
      if (isEditActive) {
        document.getElementById(group_id).remove();
        data.child(key).remove();
      } else {
        var del = document.getElementById("update_" + check_id);
        del.remove();
        // console.log(taskEdit);
        document.getElementById(check_id).innerHTML = taskEdit;
        document.getElementById(edit_id).innerHTML =
          '<button class="btn btn-sm btn-info" href="#"><i class="fa fa-edit mr-2"></i> Edit</button>';

        document.getElementById(id).innerHTML =
          '<button class="btn btn-sm btn-danger del_btn" href="#"><i class="fa fa-trash mr-2"></i> Delete</button>';
        isEditActive = true;
      }
    });
    document.getElementById(done_id).addEventListener("click", () => {
      if (isEditActive) {
        if ($("#" + done_id).is(":checked")) {
          $("#" + done_id).attr("checked", "checked");
          Done = "checked";
          checked = 1;
          stikeOut = "line-through";
          data.child(key).child("isDone").set(Done);
          data.child(key).child("stikeOut").set(stikeOut);
        } else {
          $("#" + done_id).attr("checked", "false");
          Done = "";
          checked = 0;
          stikeOut = "none";
          data.child(key).child("isDone").set(Done);
          data.child(key).child("stikeOut").set(stikeOut);
        }

        if (checked) {
          document.getElementById(check_id).style.textDecoration = stikeOut;
          document.getElementById(check_id).style.color = "grey";
        } else {
          document.getElementById(check_id).style.textDecoration = stikeOut;
          document.getElementById(check_id).style.color = "black";
        }
      }
    });
  });
}

document.querySelector("#add-btn").addEventListener("click", (event) => {
  event.preventDefault();
  let TASK = document.querySelector("#input-task").value;

  if (TASK == "") {
    $("input").attr("required", true);
  } else {
    var key = firebaseRef.child("Tasks").push();
    key.child("taskName").set(TASK);
    $("input").attr("required", false);
    document.querySelector("#input-task").value = "";
  }
});
