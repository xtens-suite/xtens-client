<template>
    <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-toggle target="navCollapse" />

        <b-navbar-brand class="logo" href="#">XTENS</b-navbar-brand>

        <b-collapse is-nav id="navCollapse">

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-nav-item-dropdown right>
                    <template slot="button-content">
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#">Signout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>
<script>
export default {};
</script>
<style scoped lang="scss">
$logo-border-radius: 4px;
.logo {
    border: 2px solid #fff;
    padding: 0.01em $logo-border-radius;
    border-radius: $logo-border-radius;
    font-weight: bolder;
}
</style>
