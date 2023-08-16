document.addEventListener("DOMContentLoaded", function() {
        const materialSelection = document.getElementById("material-selection");
        const normalImage = document.getElementById("normal-img");
        const advancedImage = document.getElementById("advanced-img");
        const eliteImage = document.getElementById("elite-img");
        const epicImage = document.getElementById("epic-img");
        const legendaryImage = document.getElementById("legendary-img");
    
        materialSelection.addEventListener("change", function() {
            const selectedMaterial = materialSelection.value;
            updateMaterialImages(selectedMaterial);
        });
        
        //Change Photo based on the material selected
        function updateMaterialImages(selectedMaterial) {
            const newMaterialPrefix = selectedMaterial.charAt(0).toUpperCase();
            normalImage.src = `Materials/${selectedMaterial}/Normal${newMaterialPrefix}.png`;
            advancedImage.src = `Materials/${selectedMaterial}/Advanced${newMaterialPrefix}.png`;
            eliteImage.src = `Materials/${selectedMaterial}/Elite${newMaterialPrefix}.png`;
            epicImage.src = `Materials/${selectedMaterial}/Epic${newMaterialPrefix}.png`;
            legendaryImage.src = `Materials/${selectedMaterial}/Legendary${newMaterialPrefix}.png`;
        }
        //load the material while loading the page for the first time
        function loadImages(material) {
            updateMaterialImages(material);
        }
        loadImages("leather");

        //Calculate button 
    const calculateBtn = document.getElementById("calculate-btn");
    const rarityInputs = ["normal", "advanced", "elite", "epic", "legendary"];
    const materialQuantities = {
        leather: 0,
        'iron-ore': 0,
        boxes: 0,
        ebony: 0
    };

    //storing the values?
    rarityInputs.forEach(rarity => {
        const input = document.getElementById(rarity);
        input.addEventListener("input", function(event) {
            const inputValue = parseInt(event.target.value);
            event.target.value = isNaN(inputValue) || inputValue < 0 ? 0 : inputValue;
        });
    });

    calculateBtn.addEventListener("click", function() {
        const selectedMaterial = materialSelection.value;
        let calculatedValues = {}; // Track calculated values for each rarity
        rarityInputs.forEach(rarity => {
            const input = document.getElementById(rarity);
            const quantity = parseInt(input.value) || 0;
            const calculatedQuantity = calculateRarityQuantity(rarity, quantity);
            materialQuantities[selectedMaterial] += calculatedQuantity;
            calculatedValues[rarity] = calculatedQuantity;
            input.value = "";

            //testing #1
            const calculatorData = {
                calculatedValues: calculatedValues,
                materialQuantities: materialQuantities
            };
        
            localStorage.setItem("calculatorData", JSON.stringify(calculatorData));
        });
        
        updateSummary(calculatedValues); // Pass the calculated values to the updateSummary function
    });


    //testing #2
    const savedCalculatorData = JSON.parse(localStorage.getItem("calculatorData"));
    if (savedCalculatorData) {
    // Restore input values
    rarityInputs.forEach(rarity => {
        const input = document.getElementById(rarity);
        input.value = savedCalculatorData.materialQuantities[rarity] || 0;
    });

    // Restore material quantities
    for (const material in materialQuantities) {
        materialQuantities[material] = savedCalculatorData.materialQuantities[material] || 0;
    }

    // Update the summary with restored data
    updateSummary(savedCalculatorData.calculatedValues);
}

    // Clear button event listener
const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", function() {
    rarityInputs.forEach(rarity => {
        const input = document.getElementById(rarity);
        input.value = "";
    });
    localStorage.removeItem("calculatorData");// reset everything
    localStorage.clear();//also reset local storage
    location.reload();//reload
    materialQuantities.leather = 0;
    materialQuantities['iron-ore'] = 0;
    materialQuantities.boxes = 0;
    materialQuantities.ebony = 0;
    updateSummary(); // Update the summary after clearing
    document.getElementById("result").classList.add("hidden"); // Hide the result section
});

    //Formula for legendary materials
    function calculateRarityQuantity(rarity, inputQuantity) {
        if (rarity === "normal") {
            return inputQuantity / 256;
        } else if (rarity === "advanced") {
            return inputQuantity / 64;
        } else if (rarity === "elite") {
            return inputQuantity / 16;
        } else if (rarity === "epic") {
            return inputQuantity / 4;
        } else if (rarity === "legendary") {
            return inputQuantity;
        }
        return 0;
    }

    function updateSummary(calculatedValues) {
        for (const material in materialQuantities) {
            const span = document.getElementById(`${material}-sum`);
            span.textContent = materialQuantities[material];
        }
        // Calculate and display the total legendary sum
        const totalLegendarySumElement = document.getElementById("total-legendary-sum");
        const totalLegendarySum = materialQuantities['leather'] +
                                  materialQuantities['iron-ore'] +
                                  materialQuantities['boxes'] +
                                  materialQuantities['ebony'];
        totalLegendarySumElement.textContent = totalLegendarySum;
    



        // Display the calculated values for each rarity in the result section
       /* const calculatedAmountElement = document.getElementById("calculated-amount");
        const summaryItems = rarityInputs.map(rarity => {
            const value = calculatedValues[rarity] || 0;
            return `${rarity.charAt(0).toUpperCase() + rarity.slice(1)}: ${value}`;
        });*/
        
        // Create a new line for each calculation
       // calculatedAmountElement.innerHTML = "Your legendary materials are: <br>" + summaryItems.join("<br>");
       // document.getElementById("result").classList.remove("hidden");
    }
});
    



