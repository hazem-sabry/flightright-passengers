<template>
    <section class="primary">
        <h1>Primary Passenger</h1>
        <form @submit.stop>
            <label for="fullName">
                <input type="text" id="fullName" tabindex="1">
                <span>Full Name</span>
            </label>
            <countries-select :options="countries"/>
        </form>
    </section>
</template>

<script>
import countriesSelect from './countriesSelect'


export default {
    components: {
        countriesSelect
    },
    computed: {
        countries: function() {
            return this.$store.getters.getCountries;
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