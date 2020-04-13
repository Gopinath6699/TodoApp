// function main(){
//     if($('#mainCard').innerHTML == null){
//         document.querySelector('#mainCard').innerHTML = "NO TASK FOUND."
//       }
// }
let task_v = ''
document.querySelector('#add-btn').addEventListener('click', (event) => {
    event.preventDefault()
    let TASK = document.querySelector('#input-task').value
    var id = "id" + Math.random().toString(10).slice(2)
    var group_id = "id" + Math.random().toString(15).slice(2)
    var check_id = "id" + Math.random().toString(20).slice(2)
    var done_id = 'id' + (new Date()).getTime();
    console.log(id)
    console.log(group_id)
    console.log(check_id)

    if(TASK == ''){
        $('input').attr('required', true); 
    } 
    else if(task_v != TASK){
        $('.add-task').append('<a href="#" id="'+group_id+'" class="list-group-item list-group-item-action"><div class="d-flex custom-control custom-checkbox my-1 mr-sm-2"><input type="checkbox" class="custom-control-input" id="'+done_id+'"><label class="custom-control-label px-5 mr-5 delete-btn" id="'+check_id+'" for="'+done_id+'"> '+TASK+' </label><button class="btn btn-sm btn-danger ml-auto" id="'+id+'" href="#"><i class="fa fa-trash mr-2"></i> Delete</button></div></a>')
    task_v = TASK
    $('input').attr('required', false);
    document.querySelector('#input-task').value = ''
    } 

    document.getElementById(id).addEventListener('click', () => {
        document.getElementById(group_id).remove()
    })

    document.getElementById(done_id).addEventListener('click', () => {
        if($('#'+done_id).is(":checked")){
            document.getElementById(check_id).style.textDecoration = 'line-through'
            document.getElementById(check_id).style.color = 'grey'
        }else{
            document.getElementById(check_id).style.textDecoration = 'none'
            document.getElementById(check_id).style.color = 'black'
        }
        
    })
})


