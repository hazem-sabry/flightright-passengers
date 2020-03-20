<template>
    <section class="primary" @click="closeSelect()">
        <h1>Primary Passenger</h1>

        <app-forms>
            <label for="fullName">
                <input
                    type="text" 
                    id="fullName" 
                    tabindex="1" 
                    placeholder=" "
                    @keyup="toggleErrorClass($event)"
                    autocomplete="off"
                    ref="fullName"
                    required>
                <span>Full Name</span>
            </label>
            <label for="age">
                <input 
                    type="number" 
                    id="age" 
                    tabindex="2" 
                    placeholder=" " 
                    @keyup="toggleErrorClass($event)"
                    autocomplete="off"
                    ref="age"
                    required>
                <span>Age</span>
            </label>
            <label for="email">
                <input 
                    type="email" 
                    id="email" 
                    tabindex="3" 
                    placeholder=" " 
                    @keyup="toggleErrorClassForEmail($event)"
                    autocomplete="off"
                    ref="email"
                    required>
                <span>Email</span>
            </label>
            <countries-select 
                ref="countrySelect" 
                :options="countries"
                @interface="countrySelected($event)"/>
            <label for="street">
                <input 
                    type="text" 
                    id="street" 
                    tabindex="5" 
                    placeholder=" " 
                    @keyup="toggleErrorClass($event)"
                    autocomplete="off"
                    ref="street"
                    required>
                <span>Street</span>
            </label>
            <label for="zip">
                <input 
                    type="number" 
                    id="zip" 
                    tabindex="6" 
                    placeholder=" " 
                    @keyup="toggleErrorClass($event)"
                    autocomplete="off" 
                    ref="zip"
                    required>
                <span>Zip</span>
            </label>
            <label for="phone">
                <input 
                    type="tel" 
                    id="phone" 
                    tabindex="7" 
                    placeholder=" " 
                    @keyup="toggleErrorClass($event)"
                    autocomplete="off" 
                    ref="phone"
                    required>
                <span>Phone</span>
            </label>
            <button 
                type="submit" 
                tabindex="8"
                @click="addPrimaryData($event)">Next!</button>
        </app-forms>
    </section>
</template>

<script>
import countriesSelect from '../components/countriesSelect'
import appForms from '../components/appForms'


export default {
    data() {
        return { 
            country: {}
        }
    },
    components: {
        countriesSelect,
        appForms
    },
    computed: {
        countries: function() {
            return this.$store.getters.getCountries;
        }
    },
    methods: {
        validateEmail: function(email) {
            const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
            return regex.test(String(email).toLowerCase());
        },
        validateInputsNotEmpty: function(){

            let result = {
                status: true,
                failedElements: []
            },
            inputs = []

            inputs.push(this.$refs.fullName)
            inputs.push(this.$refs.age)
            inputs.push(this.$refs.email)
            inputs.push(this.$refs.street)
            inputs.push(this.$refs.zip)
            inputs.push(this.$refs.phone)

            inputs.forEach(input => {

                // eslint-disable-next-line
                if(!!input.value) {

                    result.staus = result.staus == true ? true : false

                } else {

                    result.status = false
                    result.failedElements.push(input)

                }

            })

            if (this.country.name == undefined) {

                result.failedElements.push(this.$refs.countrySelect.$el)

            }

            return result

        },
        countrySelected: function(option) {
            this.country = option
        },
        formatDataAsJSON: function() {
            let data = {}

            data.fullName = this.$refs.fullName.value;
            data.age = this.$refs.age.value;
            data.email = this.$refs.email.value;
            data.country = this.country;
            data.street = this.$refs.street.value;
            data.zip = this.$refs.zip.value;
            data.phone = this.$refs.phone.value;

            return data
        },
        resetValues: function() {

            this.$refs.fullName.value = ''
            this.$refs.age.value = ''
            this.$refs.email.value = '';
            this.country = {};
            this.$refs.street.value = '';
            this.$refs.zip.value = '';
            this.$refs.phone.value = '';

        },
        addPrimaryData: function (e) {
            let inputsNotEmpty = this.validateInputsNotEmpty(),
                emailValidation = this.validateEmail(this.$refs.email.value),
                everythingIsGoingWell = false,
                store = this.$store,
                router = this.$router;

            // First we validate inputs not empty
            if ( inputsNotEmpty.status ) {
                everythingIsGoingWell = true;
            } else {
                inputsNotEmpty.failedElements.forEach( element => {
                    element.classList.add('error');
                })
                everythingIsGoingWell = false
            }

            // then ask about email
            if ( emailValidation ) {
                everythingIsGoingWell = everythingIsGoingWell == true ? true : false;
            } else {
                this.$refs.email.classList.add('error');
                everythingIsGoingWell = false
            }

            if (everythingIsGoingWell) {

                e.preventDefault();

                let data = this.formatDataAsJSON();


               store.commit('setPrimaryPassenger', data);
               store.commit('setPrimaryPassengerStatus');

                this.resetValues();
                router.push('/seconadry');
            }

        },
        toggleErrorClass: function (e) {

            e.target.classList.remove('error')

        },
        toggleErrorClassForEmail: function (e) {

            let status = this.validateEmail(e.target.value)

            status ? e.target.classList.remove('error') : ''

        },
        closeSelect() {
            this.$refs.countrySelect ? this.$refs.countrySelect.showDropdown = false : ''
        }
    }
}
</script>

<style lang="sass">

section
    text-align: center
    padding: 20px

    h1
        font-weight: 100
    
</style>