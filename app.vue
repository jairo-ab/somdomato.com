<template>
  <NuxtLayout>
    <Head>
      <Title>Rádio Som do Mato</Title>
      <Meta name="description" content="A mais sertaneja" />
      <Meta property="og:title" content="Rádio Som do Mato" />
      <Meta property="og:description" content="A mais sertaneja" />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content="https://somdomato.com" />
      <Meta property="og:image" content="http://somdomato.com/img/ogp.png" />
      <Link rel="icon" href="/favicon.ico" />
    </Head>
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
