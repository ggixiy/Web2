
window.addEventListener("DOMContentLoaded", () => {
    /* -------- 1 -------- */
    const header = document.querySelector("header h1");
    const block6 = document.querySelector(".block6");

    const headerText = header.textContent;
    const block6Text = block6.textContent;

    header.textContent = block6Text;  
    block6.textContent = headerText; 

    /* -------- 2 -------- */
    const radius = 5;
    const block5 = document.querySelector(".block5");
    calcCircleArea(radius, block5);

    /* -------- 3 -------- */
    const numberForm = document.getElementById("numberForm");
    const numInput = document.getElementById("numInput");

    const savedMin = getCookie("minDigit");
    if (savedMin !== undefined) {
        if (confirm("Last saved min digit: " + savedMin + ". Save value?")) {
            alert("Data saved. Refresh page to change data.");
            numberForm.style.display = "none";
        } else {
            document.cookie = "minDigit=;path=/;max-age=0";
            location.reload();
            numberForm.style.display = "block";
        }
    } else {
        numberForm.style.display = "block";
    }

    numberForm.addEventListener("submit", function(e){
        e.preventDefault();
        const num = numInput.value.trim();

        if (!/^\d+$/.test(num)) {
            alert("Please enter natural number!");
            return;
        }

        const minDigit = findMinDigit(num);
        alert("Min digit: " + minDigit);
        document.cookie = "minDigit=" + minDigit + ";path=/;max-age=86400";
    });

    /* -------- 4 -------- */
    const colorSelect = document.getElementById("colorSelect");

    const savedColor = localStorage.getItem("selectedColor");
    if (savedColor) {
        block6.style.color = savedColor;
        colorSelect.value = savedColor;
    }

    colorSelect.addEventListener("change", () => {
        block6.style.color = colorSelect.value;
        localStorage.setItem("selectedColor", colorSelect.value);
    });

    /* ----------------- 5 ----------------- */
    const blocks = document.querySelectorAll("[class^='block']");

    Object.keys(localStorage).forEach(key => {
        if (key.startsWith("block")) {
            localStorage.removeItem(key);
        }
    });

    blocks.forEach(block => {
        const img = block.querySelector("img");

        if (img) {
            img.addEventListener("mouseleave", () => {
                if (block.querySelector(".table-form")) return;

                const form = document.createElement("div");
                form.className = "table-form";
                form.innerHTML = `
                    <label>Enter the values separated by space:</label><br>
                    <input type="text" class="table-input" placeholder="For example: A B C D E F"><br>
                    <button class="save-btn">Create table</button>
                `;

                block.appendChild(form);

                form.querySelector(".save-btn").addEventListener("click", () => {
                    const input = form.querySelector(".table-input").value.trim();
                    if (!input) {
                        alert("Enter at least one value!");
                        return;
                    }

                    const values = input.split(" ").map(v => v.trim()).filter(v => v !== "");
                    const table = document.createElement("table");
                    table.border = "1";
                    table.style.marginTop = "10px";

                    if (values.length % 2 === 0) {
                        const half = values.length / 2;
                        const row1 = table.insertRow();
                        const row2 = table.insertRow();

                        for (let i = 0; i < half; i++) {
                            row1.insertCell().textContent = values[i];
                        }
                        for (let i = half; i < values.length; i++) {
                            row2.insertCell().textContent = values[i];
                        }
                    } else {
                        const row = table.insertRow();
                        values.forEach(v => row.insertCell().textContent = v);
                    }

                    const blockId = block.className;
                    localStorage.setItem(blockId, JSON.stringify(values));

                    block.appendChild(table);

                    alert("Table created and added localStorage!");
                });
            });
        }
    });
});

function calcCircleArea(r, block) {
    let S = Math.PI * r * r;
    
    const p = document.createElement("p");
    p.textContent = "Area of the circle with radius "+ r + " = " + S.toFixed(2);

    block.appendChild(p); 
}

function findMinDigit(number) {
    const digits = number.toString().split("");
    return Math.min(...digits.map(d => parseInt(d)));
}

function getCookie(name) {
        const matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? matches[1] : undefined;
}