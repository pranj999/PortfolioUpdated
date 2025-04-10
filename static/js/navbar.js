<script>
    window.addEventListener("scroll", function() {
      const navbar = document.getElementById("navbar");
      if (window.pageYOffset > 0) {
        navbar.classList.add("bg-black");
      } else {
        navbar.classList.remove("bg-black");
      }
    });
  </script>