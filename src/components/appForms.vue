<template>
    <form autocomplete="off">
        <slot />
    </form>
</template>

<style lang="sass">

form
    width: 100%
    max-width: 350px
    margin: 5px auto
    display: flex
    flex-wrap: wrap
    align-items: center
    justify-content: center

    button
        position: relative
        border-radius: 8px
        font-size: 25px
        color: #FFF	
        width: 200px
        border-radius: 6px
        margin: 15px 0 0
        padding: 10px
        font-size: 1.2em
        background-color: #82BF56
        border-bottom: 5px solid #669644
        letter-spacing: 1px
        font-weight: 100
        cursor: pointer
        transition: all 0.2s

        &:active
            transform: translate(0px,5px)
            border-bottom: 1px solid

    label
        position: relative
        width: 100%
        height: 50px
        display: block
        border-radius: 6px
        box-shadow: 3px 3px 4px 0 rgba(0, 0, 0, 0.09)
        margin: 15px 0 0
        cursor: pointer

        span
            position: absolute
            top: 50%
            left: 5px
            transform: translateY(-50%)
            color: rgba(0,0,0,.45);
            background-color: #fff
            padding: 0 5px
            z-index: 2
            font-weight: 100
            font-size: 1em
            transition: all .15s ease
            will-change: top, left, font-size
            pointer-events: none

        input
            position: absolute
            top: 0
            left: 0
            z-index: 1
            width: 100%
            height: 100%
            padding: 15px
            font-size: 1.2em
            cursor: pointer
            border-radius: 6px
            border: 1.5px solid #eee
            transition: border .3s ease
            will-change: border

            &[type="number"]::-webkit-outer-spin-button, &[type="number"]::-webkit-inner-spin-button
                -webkit-appearance: none;
                margin: 0

            /* Firefox */
            &[type=number]
                -moz-appearance: textfield

            &:active, &:focus, &:not(:placeholder-shown)
                border: 1.5px solid var(--green)

            &:active + span, &:focus + span, &:not(:placeholder-shown) + span
                top: 0px
                left: 8px
                color: var(--green)
                font-size: .8em

            &.error
                border-color: #e84118

                &:active + span, &:focus + span, &:not(:placeholder-shown) + span
                    color: #e84118
    
</style>