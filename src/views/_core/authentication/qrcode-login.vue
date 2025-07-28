<script lang="ts" setup>
import { AuthenticationQrCodeLogin } from '@/components/common-ui';
import { LOGIN_PATH } from '@/shared/constants';

defineOptions({ name: 'QrCodeLogin' });
</script>

<template>
  <AuthenticationQrCodeLogin :login-path="LOGIN_PATH" />
</template>
