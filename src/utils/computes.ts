import UnderlineText from '@/components/UnderlineText/UnderlineText.vue';
const registerGlobalComponents = app => {
  app.component({
    'underline-text': UnderlineText
  });
};

export default registerGlobalComponents;
