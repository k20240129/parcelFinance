const underlineDirective = {
  beforeMount(el, binding) {
    const span = document.createElement('span');
    span.classList.add('underline__bar');
    el.appendChild(span);
    span.style.backgroundColor = binding.value || 'black';
    el.addEventListener('mouseenter', () => {
      span.style.left = 0;
      span.style.right = 0;
    });
    el.addEventListener('mouseleave', () => {
      span.style.left = '50%';
      span.style.right = '50%';
    });
  }
};

export default underlineDirective;
