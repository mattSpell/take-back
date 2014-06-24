(function() {
  'use strict';
  $(document).ready(function() {
    $('#submit').on('click', function() {
      $.ajax({
        type: 'POST',
        url: '/reports',
        data: $('form.report').serialize(),
        success: function(html) {
          window.location.replace('/profile');
          console.log(html);
        }
      });
    });
  });
})();

//# sourceMappingURL=submitForm.map
