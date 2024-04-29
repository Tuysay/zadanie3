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
    }
});

Vue.component('column-planned-tasks', {

});


Vue.component('column-tasks-work', {

})

Vue.component('column-testing', {

})

Vue.component('column-completed-tasks', {

});

Vue.component('card-edit', {

});

Vue.component('card-form', {

});

Vue.component('add-reason', {

});

Vue.component('create-card', {

});


let app = new Vue({
    el: '#app',
    data() {
        return {}
    }

})