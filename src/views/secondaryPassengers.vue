<template>
    <section class="secondary">

        <h1>Secondary Passengers</h1>

        <div class="secondary__persons">
            <div 
                class="secondary__persons__person" 
                v-for="(passenger, index) in passengers" 
                :key="index">
                <img src="../assets/images/person.svg" alt="Person">
                <span>{{ passenger.fullName | limitString }}</span>
                <strong>{{ passenger.age }}</strong>
                <button  @click="deletePassenger(index)">
                    <img src="../assets/images/delete-colorfull.svg" alt="Delete">
                </button>
            </div>
        </div>

        <app-forms>

             <label for="fullName">
                <input
                    type="text" 
                    id="fullName" 
                    tabindex="1" 
                    placeholder=" " 
                    ref="fullName"
                    autocomplete="off"
                    required>
                <span>Full Name</span>
            </label>
            <label for="age">
                <input 
                    type="number" 
                    id="age" 
                    tabindex="2" 
                    placeholder=" " 
                    ref="age"
                    autocomplete="off"
                    required>
                <span>Age</span>
            </label>
            <button 
                type="submit" 
                tabindex="8"
                @click="addSecondaryData($event)">Add!</button>

        </app-forms>
    </section>
</template>

<script>
import appForms from '../components/appForms'

export default {
    components: {
        appForms
    },
    computed: {
        passengers: function() {
            return this.$store.getters.getSecondaryPassengers;
        }
    },
    filters: {
        limitString: function (value) {

            return value.length > 15 ? `${value.substring(0, 15)}...` : value

        }
    },
    methods: {
        validateInputsNotEmpty: function(){

            let result = {
                status: true,
                failedElements: []
            },
            inputs = []

            inputs.push(this.$refs.fullName)
            inputs.push(this.$refs.age)

            inputs.forEach(input => {

                // eslint-disable-next-line
                if(!!input.value) {

                    result.staus = result.staus == true ? true : false

                } else {

                    result.status = false
                    result.failedElements.push(input)

                }

            })

            return result

        },
        formatDataAsJSON: function() {
            let data = {}

            data.fullName = this.$refs.fullName.value;
            data.age = this.$refs.age.value;

            return data
        },
        resetValues: function() {
            this.$refs.fullName.value = ''
            this.$refs.age.value = ''
        },
        addSecondaryData: function (e) {
            let inputsNotEmpty = this.validateInputsNotEmpty(),
                everythingIsGoingWell = false,
                store = this.$store;

            if (inputsNotEmpty.status) {
                everythingIsGoingWell = true;
            } else {

                inputsNotEmpty.failedElements.forEach( element => {
                    element.classList.add('error');
                })
                
                everythingIsGoingWell = false
            }

            if (everythingIsGoingWell) {

                e.preventDefault();

                let data = this.formatDataAsJSON();

                this.resetValues()

                store.commit('setSecondaryPassengers', data)

            }
        },
        deletePassenger: function(index) {
            
            const store = this.$store;

            store.commit('deleteSecondaryPassenger', index);

        }
    }
}
</script>

<style lang="sass">

.secondary
    text-align: center
    padding: 20px

    h1
        font-weight: 100

    &__persons
        width: 100%
        max-width: 300px
        height: 160px
        max-height: 160px
        margin: 30px auto 10px
        overflow-x: hidden
        overflow-y: scroll

        &::-webkit-scrollbar
            width: 3px

        /* Track */
        &::-webkit-scrollbar-track
            background: #f1f1f1
            border-radius: 5px

        /* Handle */
        &::-webkit-scrollbar-thumb
            background: var(--green)
            border-radius: 5px

        /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover
            background: var(--green)

        &__person
            position: relative
            display: flex
            align-items: center
            justify-content: flex-start
            height: 40px
            padding-right: 55px

            &:nth-of-type(even)
                background-color: rgba(110, 185, 38, .09)


            img
                width: 30px

            span
                padding-left: 7px

            strong
                margin-left: auto

            button
                position: absolute
                top: 50%
                right: 0
                transform: translateY(-50%)
                width: 50px
                border: 0
                background-color: transparent
                padding: 5px
                cursor: pointer

                img
                    max-width: 100%
    
</style>