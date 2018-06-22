window.onload = () => {
  const btnEl = document.getElementById("suggest-edit");
  let beforeEdit = null;
  btnEl.onclick = (e) => {
    e.preventDefault();
    if (beforeEdit === null) {
      alert("Edit anything on the page. When you're done, hit 'Save edits'.");
      btnEl.innerText = "Save edits";
      document.body.contentEditable = true;
      beforeEdit = document.body.innerHTML;
    } else {
      afterEdit = document.body.innerHTML;
      document.body.contentEditable = false;
      btnEl.innerText = "Suggest edit";
      const patch = JsDiff.createPatch(window.location.href, beforeEdit, afterEdit, "", "");
      beforeEdit = null;
      fetch("https://hooks.zapier.com/hooks/catch/2257982/wddkks/", {
        method: "POST",
        body: JSON.stringify({
          url: window.location.href,
          diff: patch,
          description: prompt("Please briefly describe your changes"),
          email: prompt("What is your email address?")
        })
      });
      alert("Thanks for your suggestion!");
    }
  };
}