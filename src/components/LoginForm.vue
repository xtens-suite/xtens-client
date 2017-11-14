<template>
    <div class='main'>
        <div id='headingsCnt'>
            <h1>Account Login: </h1>
        </div>
        <div id='formCnt'>
            <b-form @submit="onSubmit">
                <b-form-group id="loginGroup" label="Login:" label-for="login"
                    description="We'll protect the privacy of your login">
                    <b-form-input id="login" type="text" v-model="form.login" required
                        placeholder="Please enter username or email" />
                </b-form-group>
                <b-form-group id="passwordGroup" label="Password:" label-for="password">
                    <b-form-input id="password" type="password" v-model="form.password" required
                        placeholder="Please enter password" />
                </b-form-group>
                <b-form-group id="loginFailed" v-if="loginFailed" state="invalid">
                    <span class="control-label">
                        <strong>Wrong username and/or password!</strong>
                    </span>
                </b-form-group>
                <b-form-group id="serverErrorOnLogin" v-if="serverErrorOnLogin" state="invalid">
                    <span class="control-label">
                        <strong>Something went wrong. Please try agin in a few minutes, or contact us.</strong>
                    </span>
                </b-form-group>
                <b-button type="submit" variant="primary">Sign in</b-button>
                <b-button type="reset" variant="secondary">Reset</b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {

    data() {
        return {
            form: {
                login: '',
                password: ''
            },
            loginFailed: false,
            serverErrorOnLogin: false
        };
    },

    methods: {

        async onSubmit(ev) {
            ev.preventDefault();
            const { form } = this;
            try {
                const res = await axios.post('/api/login', {
                    identifier: form.login,
                    password: form.password
                });
                this.onSuccess(res.data);
            } catch (err) {
                this.onError(err);
            }
        },

        onSuccess(payload) {
            this.loginFailed = false;
            this.serverErrorOnLogin = false;
            console.log(payload);
        },

        onError(error) {
            const { response } = error;
            if (response && response.status === 401) {
                this.loginFailed = true;
            } else {
                this.serverErrorOnLogin = true;
            }
        }
    }
};
</script>
<style scoped lang="scss">
$max-width: 480px;
.main {
    display: flex;
    align-items: center;
    justify-content: center;
    /* max-width: $max-width; */
}
#formCnt {
    max-width: $max-width;
}
</style>
