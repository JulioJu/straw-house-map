<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8 toastify-container">
        <h1 v-text="$t('register.title')" id="register-title" data-cy="registerTitle">Registration</h1>

        <div class="alert alert-success" role="alert" v-if="success" v-html="$t('register.messages.success')">
          <strong>Registration saved!</strong> Please check your email for confirmation.
        </div>

        <div class="alert alert-danger" role="alert" v-if="error" v-html="$t('register.messages.error.fail')">
          <strong>Registration failed!</strong> Please try again later.
        </div>

        <div class="alert alert-danger" role="alert" v-if="errorUserExists" v-html="$t('register.messages.error.userexists')">
          <strong>Login name already registered!</strong> Please choose another one.
        </div>

        <div class="alert alert-danger" role="alert" v-if="errorEmailExists" v-html="$t('register.messages.error.emailexists')">
          <strong>Email is already in use!</strong> Please choose another one.
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <form id="register-form" name="registerForm" role="form" v-on:submit.prevent="register()" v-if="!success" no-validate>
          <div class="form-group">
            <label class="form-control-label" for="username" v-text="$t('global.form[\'username.label\']')">Username</label>
            <input
              type="text"
              class="form-control"
              v-model="$v.registerAccount.login.$model"
              id="username"
              name="login"
              :class="{ valid: !$v.registerAccount.login.$invalid, invalid: $v.registerAccount.login.$invalid }"
              required
              minlength="1"
              maxlength="50"
              pattern="^[a-zA-Z0-9!#$&'*+=?^_`{|}~.-]+@?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
              v-bind:placeholder="$t('global.form[\'username.placeholder\']')"
              data-cy="username"
            />
            <div v-if="$v.registerAccount.login.$anyDirty && $v.registerAccount.login.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.registerAccount.login.required"
                v-text="$t('register.messages.validate.login.required')"
              >
                Your username is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.registerAccount.login.minLength"
                v-text="$t('register.messages.validate.login.minlength')"
              >
                Your username is required to be at least 1 character.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.registerAccount.login.maxLength"
                v-text="$t('register.messages.validate.login.maxlength')"
              >
                Your username cannot be longer than 50 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.registerAccount.login.pattern"
                v-text="$t('register.messages.validate.login.pattern')"
              >
                Your username can only contain letters and digits.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="email" v-text="$t('global.form[\'email.label\']')">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              :class="{ valid: !$v.registerAccount.email.$invalid, invalid: $v.registerAccount.email.$invalid }"
              v-model="$v.registerAccount.email.$model"
              minlength="5"
              maxlength="254"
              email
              required
              v-bind:placeholder="$t('global.form[\'email.placeholder\']')"
              data-cy="email"
            />
            <div v-if="$v.registerAccount.email.$anyDirty && $v.registerAccount.email.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.registerAccount.email.required"
                v-text="$t('global.messages.validate.email.required')"
              >
                Your email is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.registerAccount.email.email"
                v-text="$t('global.messages.validate.email.invalid')"
              >
                Your email is invalid.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.registerAccount.email.minLength"
                v-text="$t('global.messages.validate.email.minlength')"
              >
                Your email is required to be at least 5 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.registerAccount.email.maxLength"
                v-text="$t('global.messages.validate.email.maxlength')"
              >
                Your email cannot be longer than 100 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="firstPassword" v-text="$t('global.form[\'newpassword.label\']')">New password</label>
            <!-- START added by JulioJu -->
            <input
              type="password"
              class="form-control"
              id="firstPassword"
              name="password"
              :class="{ valid: !$v.registerAccount.password.$invalid, invalid: $v.registerAccount.password.$invalid }"
              v-model="$v.registerAccount.password.$model"
              minlength="8"
              maxlength="50"
              required
              v-bind:placeholder="$t('global.form[\'newpassword.placeholder\']')"
              data-cy="firstPassword"
            />
            <!-- END added by JulioJu -->
            <div v-if="$v.registerAccount.password.$anyDirty && $v.registerAccount.password.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.registerAccount.password.required"
                v-text="$t('global.messages.validate.newpassword.required')"
              >
                Your password is required.
              </small>
              <!-- START added by JulioJu -->
              <small
                class="form-text text-danger"
                v-if="!$v.registerAccount.password.pattern"
                v-text="$t('global.messages.validate.newpassword.pattern')"
              >
                Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un nombre et un caractère spécial
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.registerAccount.password.minLength"
                v-text="$t('global.messages.validate.newpassword.minlength')"
              >
                Your password is required to be at least 8 characters.
              </small>
              <!-- END added by JulioJu -->
              <small
                class="form-text text-danger"
                v-if="!$v.registerAccount.password.maxLength"
                v-text="$t('global.messages.validate.newpassword.maxlength')"
              >
                Your password cannot be longer than 50 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="secondPassword" v-text="$t('global.form[\'confirmpassword.label\']')"
              >New password confirmation</label
            >
            <input
              type="password"
              class="form-control"
              id="secondPassword"
              name="confirmPasswordInput"
              :class="{ valid: !$v.confirmPassword.$invalid, invalid: $v.confirmPassword.$invalid }"
              v-model="$v.confirmPassword.$model"
              minlength="4"
              maxlength="50"
              required
              v-bind:placeholder="$t('global.form[\'confirmpassword.placeholder\']')"
              data-cy="secondPassword"
            />
            <div v-if="$v.confirmPassword.$dirty && $v.confirmPassword.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.confirmPassword.required"
                v-text="$t('global.messages.validate.confirmpassword.required')"
              >
                Your confirmation password is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.confirmPassword.minLength"
                v-text="$t('global.messages.validate.confirmpassword.minlength')"
              >
                Your confirmation password is required to be at least 4 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.confirmPassword.maxLength"
                v-text="$t('global.messages.validate.confirmpassword.maxlength')"
              >
                Your confirmation password cannot be longer than 50 characters.
              </small>
              <small class="form-text text-danger" v-if="!$v.confirmPassword.sameAsPassword" v-text="$t('global.messages.error.dontmatch')">
                The password and its confirmation do not match!
              </small>
            </div>
          </div>

          <!-- START added by JulioJu -->
          <div class="mb-3">
            <strong class="text-danger">
              En cliquant sur "{{ $t('register.form.button') }}" vous vous engagagez à avoir lu
              <a class="text-info" target="_blank" to="/legal"
                >les Conditions générales d'utilisation, les limitations de responsabilité, la politique de traitement des données</a
              >
              et vous manifestez votre acceptation de toutes les dispositions sans restriction.
            </strong>
          </div>
          <!-- END added by JulioJu -->

          <button type="submit" :disabled="$v.$invalid" class="btn btn-primary" v-text="$t('register.form.button')" data-cy="submit">
            Register
          </button>
        </form>
        <!-- START added by JulioJu -->
        <!-- text deleted here -->
        <!-- END added by JulioJu -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./register.component.ts"></script>
