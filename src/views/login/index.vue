<template>
    <div class="container">
        <div class="login">
            <h1>计科院篮球院赛</h1>
            <div class="user">
                <span class="user-name">用户名</span>
                <div class="user-input">
                    <img src="../../assets/images/username.png" class="user-icon">
                    <input v-model="user.username" type="text" placeholder="请输入用户名">
                </div>
            </div>
            <div class="user">
                <span class="user-name">密码</span>
                <div class="user-input">
                    <img src="../../assets/images/password.png" class="user-icon">
                    <input v-model="user.password" type="password" placeholder="请输入密码">
                </div>
            </div>
            <button class="btn" @click="login">登陆</button>
        </div>
    </div>

</template>

<script>
    import {login} from '../../api/http.js'
    import {setToken, setUsername} from "../../utils/token";

    export default {
        data() {
            return {
                user:{
                    username: 'admin',
                    password: '123456'
                }
            }
        },
        methods: {
            login(){
                login(this.user).then(res => {
                    if (res.data.code === 200){
                        setToken(res.data.token)
                        setUsername(res.data.username)
                        this.$router.push('/index')
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url('../../assets/images/background.jpg');
        background-size: 100%;
        .login {
            background-color: white;
            border: 1px solid #000;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            box-sizing: border-box;
            padding: 30px 40px 10px 40px;
            border-radius: 7px;
            h1 {
                text-align: center;
                margin-bottom: 30px;
            }
            .user {
                display: flex;
                flex-direction: column;
                .user-name {
                    text-align: left;
                    font-size: 14px;
                    font-weight: bold;
                }
                .user-input {
                    display: flex;
                    flex-direction: row;
                    border-bottom: 1px solid #8a8a8a;
                    color: #8a8a8a;
                    margin: 15px 0;
                    padding-bottom: 15px;
                    .user-icon {
                        width: 15px;
                        margin: 0 10px;
                    }
                    input {
                        border: none;
                        outline: none;
                        width: 260px;
                    }
                }
            }
            .btn {
                width: 100%;
                height: 40px;
                margin: 20px 0 30px 0;
                border-radius: 30px;
                outline: none;
                border: none;
                color: #fff;
                cursor: pointer;
                background-image: linear-gradient(to right, #4FC8D1, #E72FF3);
            }
        }
    }

</style>