Vue.component('columns', {
    template: `
        <div class="list-notes">
            <div class="row-col">
                <create-card @card-submitted="addCard"></create-card>
<column-planned-tasks :cardList="cardsOne" @move-to-two="moveToTwo" @delete-card="card => deleteCard(card, cardsOne)"></column-planned-tasks>
                <column-tasks-work :cardList="cardsTwo" @move-to-three="moveToThree"></column-tasks-work>
                <column-testing :cardList="cardsThree" @move-to-four="moveToFour"></column-testing>
                <column-completed-tasks :cardList="cardsFour"></column-completed-tasks>
            </div>
        </div>
    `,
    data() {
        return {
            cardsOne: [],
            cardsTwo: [],
            cardsThree: [],
            cardsFour: []
        }
    },
    methods: {
        addCard(card) {
            this.cardsOne.push(card);
        },

        deleteCard(card, list) {
            const index = list.indexOf(card);
            if (index !== -1) {
                list.splice(index, 1);
            }
        }
    }
});

Vue.component('column-planned-tasks', {
    props: {
        card: Object,
        edit: Boolean,
        last: Boolean,
        del: Boolean,
    },
    template: `
    <div class="col">
        <card-form class="column"
            v-for="card in cardList"
            :key="card.title"
            :card="card"
            @move-card="moveCard"
            @delete-card="deleteCard"
            @return-card="returnCard">
        </card-form>
    </div>
    `,

    methods: {
        moveCard() {
            this.$emit('move-card', this.card);
        },
        deleteCard() {
            this.$emit('delete-card', this.card);
        },

    }
});


Vue.component('column-tasks-work', {
    props: {
        cardList: [],
    },
    template: `
    <div class="col">
        <card-form class="column"
            v-for="card in cardList"
            :key="card.title"
            :card="card"
            @move-card="moveCard">
        </card-form>
    </div>
    `,
    methods: {
        moveCard(card) {
            this.$emit('move-to-three', card);
        }
    }
})

Vue.component('column-testing', {
    props: {
        cardList: [],
    },
    template: `
    <div class="col">
        <card-form class="column"
            v-for="card in cardList"
            :key="card.title"
            :card="card"
            @move-card="moveCard"
            @move-last-card="moveLastCard">
        </card-form>
    </div>
    `,
    methods: {
        moveCard(card) {
            this.$emit('move-to-four', card);
        },
        moveLastCard(card) {
            this.$emit('move-to-two', card);
        }
    }
})

Vue.component('column-completed-tasks', {
    props: {
        cardList: [],
    },
    template: `
    <div class="col">
        <card-form class="column"
            v-for="card in cardList"
            :key="card.title"
            :card="card">
        </card-form>
    </div>
    `,
});

Vue.component('card-edit', {
    template: `
    <div class="cardOne">
    <button type="button" v-if="!show" @click="toggleEdit">Редактирование</button>
        <form class="text-form-card" v-if="show">
            <label for="title">Редактирование</label>
            <input v-model="editedTitle" id="title" type="text" :placeholder="card.title">
            <textarea v-model="editedTask" :placeholder="card.task"></textarea>
            <p>Дэдлайн: {{ card.deadline }}</p>
            <p>Дата создания: {{ card.dateCreate }}</p>
            <button type="button" @click="saveEdit">Yes</button>
            <button type="button" @click="toggleEdit">No</button>
        </form>
    </div>
    `,
    props: {
        card: Object,
    },

});

Vue.component('card-form', {
    template: `
        <div class="cardOne">
            <div v-if="!edit">
                <p>{{ card.title }}</p>
                <p>{{ card.task }}</p>
                <p>Deadline:{{ card.deadline }}</p>
                <p v-if="card.dateEdit != null">Редактирование: {{ card.dateEdit }}</p>
                <p v-if="last != true && card.reason.length > 0 "></p>
                <ul >
                    <li v-for="reas in card.reason">{{ reas }}</li>
                </ul>
                <p>Дата создания:{{card.dateCreate}}</p>
                <p v-if="card.completed != null">Карточка:  {{ card.completed ? 'Просрочен' : 'Выполнен' }}</p>
                <button type="button" @click="moveCard"  v-if="card.completed === null">
                    Переместить
                </button>
                <button type="button" v-if="del" @click="deleteCard">Удалить</button> <!-- кнопка удаления -->
                <add-reason
                    v-if="last && card.completed === null"
                    :card="card"
                    @add-reason="addReason">
                </add-reason>
            </div>
            <card-edit v-if="card.completed === null" :card="card"></card-edit>
        </div>
    `,

    methods: {
        moveCard() {
            this.$emit('move-card', this.card);
        },
        deleteCard() {
            this.$emit('delete-card', this.card);
        },

    }
});

Vue.component('add-reason', {
    template: `
    <form class="text-form-card" @submit.prevent="submitReason">
        <textarea v-model="reason" ></textarea>
        <button type="submit" :disabled="!reason">Вернуть</button>
    </form>
    `,
    props: {
        card: Object,
    },

    methods: {
        submitReason() {
            this.$emit('add-reason', this.reason);
            this.reason = "";
        }
    }
});

Vue.component('create-card', {
    template: `
    <div class="forms-create-card">
        <form class="text-form-card" @submit.prevent="onSubmit">
            <label for="title">Заголовок</label>
            <input v-model="title" id="title" type="text" placeholder="title">
            <textarea v-model="task" placeholder="task description"></textarea>
            <input v-model="deadline" type="date">
            <button type="submit">Создать</button>
            <p v-if="errors.length">
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
        </form>
    </div>
    `,


});


let app = new Vue({
    el: '#app',
    data() {
        return {
            cardsOne: [],
            cardsTwo: [],
            cardsThree: [],
            cardsFour: []
        }
    },
    methods: {
        addCard(card) {
            this.cardsOne.push(card);
        },

        deleteCard(card, list) {
            const index = list.indexOf(card);
            if (index !== -1) {
                list.splice(index, 1);
            }
        }
    }
})