<template>
</template>

<script>
export default {

    props: {
        id: Object
    },

    mount() {
        this.$store.dispatch('records/getDataTypeForEdit', {
            id: this.id
        });
    }

};
</script>
