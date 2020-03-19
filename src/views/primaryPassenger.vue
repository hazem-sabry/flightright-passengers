<template>
    <section class="primary" @click="closeSelect()">
        <h1>Primary Passenger</h1>

        <appForms>
            <label for="fullName">
                <input
                    type="text" 
                    id="fullName" 
                    tabindex="1" 
                    placeholder=" " 
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
                    autocomplete="off"
                    required>
                <span>Age</span>
            </label>
            <label for="email">
                <input 
                    type="email" 
                    id="email" 
                    tabindex="3" 
                    placeholder=" " 
                    autocomplete="off"
                    required>
                <span>Email</span>
            </label>
            <countries-select ref="countrySelect" :options="countries"/>
            <label for="street">
                <input 
                    type="text" 
                    id="street" 
                    tabindex="5" 
                    placeholder=" " 
                    autocomplete="off"
                    required>
                <span>Street</span>
            </label>
            <label for="zip">
                <input 
                    type="number" 
                    id="zip" 
                    tabindex="6" 
                    placeholder=" " 
                    autocomplete="off" 
                    required>
                <span>Zip</span>
            </label>
            <label for="phone">
                <input 
                    type="tel" 
                    id="phone" 
                    tabindex="7" 
                    placeholder=" " 
                    autocomplete="off" 
                    required>
                <span>Phone</span>
            </label>
            <button type="submit" tabindex="8">Next!</button>
        </appForms>
    </section>
</template>

<script>
import countriesSelect from '../components/countriesSelect'
import appForms from '../components/appForms'


export default {
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
        closeSelect() {
            this.$refs.countrySelect.showDropdown = false
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