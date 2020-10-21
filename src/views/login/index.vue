<template>
    <div class="login"
         :style="{'backgroundImage': 'url(' + img + ')'}">
        <div class="box">
            <h2 class="title">财税系统管理后台</h2>
            <el-input
                placeholder="用户名"
                prefix-icon="el-icon-user-solid"
                v-model="name"
                style="margin-top: 60px"/>
            <el-input
                placeholder="密码"
                prefix-icon="el-icon-s-goods"
                v-model="mobile"
                style="margin-top: 50px"
                type="password"/>
            <button class="login-btn" @click="login">登录</button>
        </div>
    </div>
</template>

<script>
    import { login } from '../../api/login'
    export default {
        data() {
            return {
                img: require('../../assets/images/login.jpg'),
                name: '',                            // 姓名
                mobile: ''                           // 手机号
            }
        },
        methods: {
            login() {
                this.$http(login, {
                    username: this.name,
                    password: this.mobile
                })
                .then(res =>{
                    if(res.data.code === 200) {
                        this.$message({
                            message: '登陆成功',
                            type: 'success'
                        })
                        // this.$store.commit('changeToken', res.data.data.token)
                        // this.$store.commit('changeCompanyName', res.data.data.username)
                        this.$cookies.set('cs_admin_token', res.data.data.token)
                        this.$cookies.set('cs_admin_name', res.data.data.username)
                        this.$router.push('/')
                        setTimeout(_ => window.location.reload(), 200)
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    $color: #3A62D7;
    .login {
        height: 100vh;
        position: relative;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .box {
            width: 433px;
            height: 372px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -70%);
            .title {
                color: #fff;
                font-size: 48px;
                text-align: center;
                letter-spacing: 5px;
            }
            /deep/ .el-input {
                background-color: transparent;
            }
            /deep/ .el-input__inner {
                border-radius: 25px;
                background-color: rgba(181,187,204, .1);
                height: 50px;
                font-weight: 600;
                color: #fff;
                font-size: 18px;
                padding-left: 48px;
                letter-spacing: 1px;
                border-color: transparent;
                &:focus {
                    border-color: rgb(202, 205, 211);
                }
            }
            /deep/ .el-input__icon {
                line-height: 48px;
                margin-left: 10px;
                font-size: 18px;
                color: #fff;
            }
            .login-btn {
                background-color: $color;
                display: block;
                width: 100%;
                height: 50px;
                margin-top: 74px;
                border: none;
                border-radius: 25px;
                font-size: 18px;
                color: #fff;
                font-weight: 600;
                cursor: pointer;
                &:active {
                    background-color: rgb(72, 109, 218);
                }
            }
        }
    }
</style>
