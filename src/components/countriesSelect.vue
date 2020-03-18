<template>
    <div class="vue-select" 
        @click="toggleDropdown" 
        @keydown="keyPressed($event)" 
        tabindex="2"><span class="selected-option">{{ placeholder }}
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z"></path>
      </svg></span>
    <transition name="slide">
      <div class="dropdown-options-container" v-show="showDropdown">
        <div 
            class="dropdown-options" v-for="(option, index) in options" :key="index"
            :class="{'selected': option.name === selected}">
          <div class="dropdown-options--cell" @click="selectOption(option)"><span class="option-text">{{ option.name }}</span></div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
export default {
    data() {
        return {
            placeholder: 'Select your country...',
            selected: 'Select your country...',
            showDropdown: false,
            optionSelected: null
        }
    },
    props: {
        options: {
            defaut: [],
            type: Array,
        },
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },
        selectOption(option) {

            this.selected = option.name;
            this.placeholder = option.name;
            this.optionSelected = option
            // inform parent (the form) of a selection so the model can be updated.
            this.$emit('interface', option)

        },
        keyPressed(e) {

            let index = null,
                optionsContainer = this.$el.querySelector('.dropdown-options-container'),
                currentOptionInDOM = this.$el.querySelector('.selected')
            
            // Enter
            if (e.keyCode == 13 || e.keyCode == 32) 
                this.toggleDropdown()

            // ArrowDown
            if (e.keyCode == 40) {

                // Select the option
                if (this.optionSelected == null) {

                    this.selectOption(this.options[0])
                    this.optionSelected = this.options[0]

                } else {

                    index = this.options.indexOf(this.optionSelected) < (this.options.length - 1) ? this.options.indexOf(this.optionSelected) : ''

                    index = index == this.options.length - 1 ? 0 : index + 1

                    this.selectOption(this.options[index])
                    this.optionSelected = this.options[index]

                }

                // Scroll the containing dev to the selected option
                if (currentOptionInDOM != null)
                    optionsContainer.scrollTop = currentOptionInDOM.offsetTop
            }
            // ArrowUp
            if (e.keyCode == 38) {

                // Select the option
                if (this.optionSelected == null) {

                    this.selectOption(this.options[0])
                    this.optionSelected = this.options[0]

                } else {

                    index = this.options.indexOf(this.optionSelected) < (this.options.length - 1) ? this.options.indexOf(this.optionSelected) : ''

                    index = index == 0 ? 0 : index - 1

                    this.selectOption(this.options[index])
                    this.optionSelected = this.options[index]

                }

                // Scroll the containing dev to the selected option
                if (currentOptionInDOM != null)
                    optionsContainer.scrollTop = currentOptionInDOM.offsetTop - 100
            }

        }
    },
    mounted() {

    }
}
</script>

<style lang="scss">

$vue-teal: #42b883;
$vue-teal-light: #42b983;
$light-gray: #f8f8f8;

@mixin active-state() {
  background-color: #f4fbf8;
  border: none;
}

@mixin ellipsis() {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.vue-select {
    width: 300px;
    background-color: #fff;
    margin: 45px auto;
    cursor: pointer;
    user-select: none;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.06);
    border: 1px solid transparent;
    position: relative;
    transition: all 200ms linear;

    &:focus {
        border: 1px solid var(--green)
    }
  
  .selected-option {
        @include ellipsis();
        display: inline-block;
        padding: 15px 50px 15px 15px;
        width: 100%;
        position: relative;
        transition: all 200ms linear;
        
        &:hover {
            color: rgba(0,0,0,.45);
        }
        
        svg {
            fill: var(--green);
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            transition: fill 300ms linear;
        }
    }   
}

.dropdown-options-container {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    z-index: 9;
    background-color: #fff;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.06);
    overflow-y: scroll;
    height: 200px;

    &::-webkit-scrollbar {
        width: 3px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 5px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: var(--green);
        border-radius: 5px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: var(--green)
    }
}

.dropdown-options--cell {
    padding: 15px;
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover { 
        @include active-state();
    }
}
.dropdown-options.selected {
    .dropdown-options--cell {
        @include active-state(); 
    }
}

.slide-enter-active, .slide-leave-active  {
    transition: height 150ms ease;
}

.slide-enter, .slide-leave-to {
    height: 0px;
}
    
</style>