document.getElementById("check-console").addEventListener("click", showMessage);

document.getElementById("bio-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;

    const result = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Age:</strong> ${age}</p>
    `;

    document.getElementById("output").innerHTML = result;

    document.getElementById("bio-form").reset();
});

function showMessage() {
    console.log("Form button clicked!");
}
