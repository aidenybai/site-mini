<script>
  let age = 17;
  setInterval(() => {
    const diff = new Date().getTime() - new Date('January 5, 2005').getTime();
    age = (diff / 1000 / 60 / 60 / 24 / 365).toFixed(9);
  }, 10)
</script>

<strong>{age}</strong>