/* eslint-disable no-console */
/* eslint-disable func-names */
(function ($) {
  $(document).ready(function () {
    $('#root').contents().unwrap();

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.addedNodes.length > 0) $.Pages.init();
      });
    });

    observer.observe(document.getElementById('root'), {
      attributes: true,
      childList: true,
      characterData: true,
    });
  });

  $('.panel-collapse label').on('click', function (e) {
    e.stopPropagation();
  });
})(window.jQuery);
