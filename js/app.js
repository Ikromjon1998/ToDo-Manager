"use strict"
// We created a task object which one store arrays from TASKS and response with boolean functions
function Task(id, description, isImportant=false, isPrivate = true, deadline = ''){
    this.id = id;
    this.description = description;
    this.important = isImportant;
    this.private = isPrivate;
    this.deadline = deadline && dayjs(deadline);

    this.isImportant = () => {
        return this.important;
    }
    this.isPrivate = () => {
        return this.private;
    }
    this.isToday =  () => {
        const comparisonTemplate = 'YYYY-MM-DD';
        const now = dayjs();
        return this.deadline && (this.deadline.format(comparisonTemplate) === now.format(comparisonTemplate));
    }
    this.isYesterday = () => {
        const comparisonTemplate = 'YYYY-MM-DD';
        const yesterday = dayjs().subtract(1, 'day');
        return this.deadline && (this.deadline.format(comparisonTemplate) === yesterday.format(comparisonTemplate));
    }
    this.isTomorrow = () => {
        const comparisonTemplate = 'YYYY-MM-DD';
        const tomorrow = dayjs().add(1, 'day');
        return this.deadline && (this.deadline.format(comparisonTemplate) === tomorrow.format(comparisonTemplate));
    }
    this.isNextWeek = () => {
        const tomorrow = dayjs().add(1, 'day');
        const nextWeek = dayjs().add(7, 'day');
        const ret = this.deadline && ( !this.deadline.isBefore(tomorrow,'day') && !this.deadline.isAfter(nextWeek,'day') );
        console.dir(this.deadline);
        console.log(ret);
        return ret;
    }

    this.formatDeadline = () => {
       if(!this.deadline) return '--o--';
       else if(this.isToday(this.deadline)) {
           return this.deadline.format('[Today at] HH:mm');
       } else if(this.isTomorrow(this.deadline)) {
           return this.deadline.format('[Tomorrow at] HH:mm');
       } else if(this.isYesterday(this.deadline)) {
           return this.deadline.format('[Yesterday at] HH:mm');
       } else {
           return this.deadline.format('dddd DD MMMM YYYY [at] HH:mm');
       }
   }
}
// TaskList stores a tasks like Task object
function TaskList(){
    this.list = [];

    this.add = (task) => {
        if(!this.list.some(t => t.id == task.id))
            this.list.push(task);
        else throw new Error('Duplicated id!')
    }

    this.filterAll = () =>{
        return this.list.filter(()=> true);
    }
    this.filterImportant = () => {
        return this.list.filter( (task) => task.isImportant() )
    }
    this.filterPrivate = () => {
        return this.list.filter( (task) => task.Private() )
    }
    this.filterByToday = () => {
        return this.list.filter( (task) => task.isToday() );
    }

    this.filterByNextWeek = () => {
        return this.list.filter( (task) => task.isNextWeek() );
    }
}


// ----- Main ----- //
const taskList = new TaskList();
// Spread operator (...) cannot be applied to objects.
TASKS.forEach(t => { taskList.add(new Task(...t)); });
createListTasks(taskList.filterAll());
// ---------------- //