<script>
import axios from 'axios';
export default {
    name: 'ToDoTask',
    props: {
        msg: String,
    },
    data() {
        return {
            task: "",
            editedTask: null,
            statuses: ["to-do", "in-progress", "finished"],
            // tasks: [{
            //     name: "webcodecamp",
            //     status: "to-do"
            // },
            // {
            //     name: "eat 1kg chocolate in 1hr",
            //     status: "in-progress"
            // },
            // {
            //     name: "create Youtube video",
            //     status: "finished"
            // }]
            tasks: []
        }
    },
    methods: {
        capitalizeFirstChart(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        async fetchTasks() {
            try {
                const response = await axios.get('http://localhost:3000/tasks');
                console.log("respo",response)
                this.tasks = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async changeStatus(index) {
            let task = this.tasks[index];
            let newIndex = this.statuses.indexOf(task.status);
            if (++newIndex > 2) newIndex = 0;
            task.status = this.statuses[newIndex];
            try {
                await axios.put(`http://localhost:3000/tasks/${task.id}`, task);
            } catch (error) {
                console.error(error);
            }
        },
        //Delete task
        async deletedTask(index) {
            console.log("index===",index)
            try {
                await axios.delete(`http://localhost:3000/tasks/${this.tasks[index].id}`);
                this.tasks.splice(index, 1);
            } catch (error) {
                console.error(error);
            }
        },

        //Edit task
        editTask(index) {
            this.task = this.tasks[index].name;
            this.editedTask = index;
        },
        //Submit task
        async submitTask() {
            if (this.task.length === 0) return;
            if (this.editedTask !== null) {
                let task = this.tasks[this.editedTask];
                task.name = this.task;
                try {
                    await axios.put(`http://localhost:3000/tasks/${task.id}`, task);
                    this.tasks[this.editedTask] = task;
                } catch (error) {
                    console.error(error);
                }
                this.editedTask = null;
            } else {
                try {
                    const response = await axios.post('http://localhost:3000/tasks', {
                        name: this.task,
                        status: 'to-do'
                    });
                    this.tasks.push(response.data);
                } catch (error) {
                    console.error(error);
                }
            }
            this.task = "";
        },
    },
    mounted() {
        this.fetchTasks();
    }

};
</script>
<template>
    <div class="container" style="max-width: 600px;">
        <h1 class="text-center">My view to do App</h1>
        <div class="d-flex mt-5">
            <input type="text" class="w-100 form control" v-model="task" placeholder="Enter task" />
            <button type="button" class="btn btn-warning" @click="submitTask">Submit</button>
        </div>
        <div class="d-flex mt-5">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Task</th>
                        <th scope="col">Status</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(task, index) in tasks" :key="index">
                        <td><span :class="{ 'line-through': task.status === 'finished' }">
                                {{ task.name }}
                            </span>

                        </td>
                        <td><span class="pointer noselect" @click="changeStatus(index)" :class="{
                            'text-danger': task.status === 'to-do',
                            'text-sucess': task.status === 'finished',
                            'text-warning': task.status === 'in-progress'
                        }">{{ capitalizeFirstChart(task.status) }}
                            </span></td>
                        <td><button type="button" class="btn btn-success" @click="editTask">Edit</button></td>
                        <td><button type="button" class="btn btn-danger" @click="deletedTask">Delete</button> </td>
                    </tr>

                </tbody>
            </table>
        </div>



    </div>
</template>
<style></style>