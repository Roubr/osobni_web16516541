// Sunny 16 Kalkulačka
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded event fired");
    
    const calculateBtn = document.getElementById('calculate-btn');
    const isoSelect = document.getElementById('iso');
    const lightingSelect = document.getElementById('lighting');
    const exposureResult = document.getElementById('exposure-result');
    const resultIso = document.getElementById('result-iso');
    const resultCondition = document.getElementById('result-condition');
    
    if (!calculateBtn || !isoSelect || !lightingSelect || !exposureResult || !resultIso || !resultCondition) {
        console.error("Některý z potřebných elementů nebyl nalezen!");
        return;
    }
    
    // Popisy světelných podmínek pro výsledky
    const conditionDescriptions = {
        'sunny': 'slunečném dni',
        'slight': 'mírně zatažené obloze',
        'overcast': 'zatažených podmínkách',
        'heavy': 'silně zatažených podmínkách',
        'sunset': 'východu/západu slunce',
        'shade': 'stínu'
    };
    
    // Standardní časy závěrky
    const standardShutterSpeeds = [1, 1/2, 1/4, 1/8, 1/15, 1/30, 1/60, 1/125, 1/250, 1/500, 1/1000, 1/2000, 1/4000];
    
    // Najít nejbližší standardní čas závěrky
    function findClosestShutterSpeed(desiredSpeed) {
        let closest = standardShutterSpeeds[0];
        let minDiff = Math.abs(desiredSpeed - closest);
        
        for (let i = 1; i < standardShutterSpeeds.length; i++) {
            const diff = Math.abs(desiredSpeed - standardShutterSpeeds[i]);
            if (diff < minDiff) {
                minDiff = diff;
                closest = standardShutterSpeeds[i];
            }
        }
        
        return closest;
    }
    
    // Formátovat čas závěrky pro zobrazení
    function formatShutterSpeed(speed) {
        if (speed >= 1) return `${speed}s`;
        const fraction = 1 / speed;
        return `1/${Math.round(fraction)}s`;
    }
    
    // Vypočítat expozici podle pravidla Sunny 16
    function calculateExposure() {
        console.log("Spouštím výpočet expozice");
        
        const iso = parseInt(isoSelect.value);
        const lighting = lightingSelect.value;
        
        console.log(`ISO: ${iso}, Podmínky: ${lighting}`);
        
        // Vypočítat základní čas závěrky (1/ISO)
        const desiredShutterSpeed = 1 / iso;
        const shutterSpeed = findClosestShutterSpeed(desiredShutterSpeed);
        
        console.log(`Požadovaný čas: 1/${1/desiredShutterSpeed}s, Nejblíže: ${formatShutterSpeed(shutterSpeed)}`);
        
        // Určit clonu podle světelných podmínek
        let aperture;
        switch(lighting) {
            case 'sunny':
                aperture = 16;
                break;
            case 'slight':
                aperture = 11;
                break;
            case 'overcast':
                aperture = 8;
                break;
            case 'heavy':
                aperture = 5.6;
                break;
            case 'sunset':
            case 'shade':
                aperture = 4;
                break;
            default:
                aperture = 16;
        }
        
        console.log(`Vypočtená clona: f/${aperture}`);
        
        // Aktualizovat výsledky
        exposureResult.textContent = `f/${aperture} na ${formatShutterSpeed(shutterSpeed)}`;
        resultIso.textContent = iso;
        resultCondition.textContent = conditionDescriptions[lighting];
        
        console.log("Výsledek aktualizován");
    }
    
    // Nastavit posluchače událostí
    calculateBtn.addEventListener('click', function() {
        console.log("Tlačítko bylo kliknuto");
        calculateExposure();
    });
    
    // Vypočítat při načtení stránky
    calculateExposure();
});
