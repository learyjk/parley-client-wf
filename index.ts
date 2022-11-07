interface CarrierData {
    CONTR_SUBST_AC: boolean;
    CONTR_SUBST_INSP_W_VIOL: number;
    CONTR_SUBST_MEASURE: number;
    DOT_NUMBER: number;
    DRIVER_INSP_TOTAL: number;
    DRIVER_OOS_INSP_TOTAL: number;
    DRIV_FIT_AC: boolean;
    DRIV_FIT_INSP_W_VIOL: number;
    DRIV_FIT_MEASURE: number;
    HOS_DRIV_AC: boolean;
    HOS_DRIV_INSP_W_VIOL: number;
    HOS_DRIV_MEASURE: number;
    INSP_TOTAL: number;
    UNSAFE_DRIV_AC: boolean;
    UNSAFE_DRIV_INSP_W_VIOL: number;
    UNSAFE_DRIV_MEASURE: number;
    VEHICLE_INSP_TOTAL: number;
    VEHICLE_OOS_INSP_TOTAL: number;
    VEH_MAINT_AC: boolean;
    VEH_MAINT_INSP_W_VIOL: number;
    VEH_MAINT_MEASURE: number;
}

const buildTargets = () => {
    const targets = document.querySelectorAll('[parley-target]')
    const result = new Map()

    targets.forEach((target) => {
        result.set(target.getAttribute('parley-target'), target.textContent)
    })

    return result;
}

const init = async () => {
    console.log("init called");

    //const targets = buildTargets()
    const targets: NodeList = document.querySelectorAll('[parley-target]')
    console.log({ targets })

    // listen for form submission
    const form = document.querySelector("form");
    if (!form) return;
    const getData = async (num): Promise<CarrierData | null> => {
        console.log('getData for num:', num)
        try {
            const response = await fetch(
                `https://parley-api-2gajsirgta-uc.a.run.app/${num}`
            );
            if (response.status === 404) {
                alert(`No records found for DOT Number ${num}`)
                return null
            }
            const data: CarrierData = await response.json();
            return data
        } catch (error) {
            console.log({ error });
            return null
        }
    }

    const updateUI = (data: CarrierData) => {

        targets.forEach((target) => {
            target.textContent = data[String((<Element>target).getAttribute('parley-target'))]
        })
    }

    const formSubmit = async (event) => {
        console.log("form submit");
        event.preventDefault();
        const dotNumber = form.querySelector<HTMLInputElement>('[parley-form="dot-number"]')?.value
        // call getData for DOT Number submitted through form
        const data = await getData(dotNumber)
        console.log({ data })
        // Update UI
        if (!data) {
            console.log('error getting carrier data!')
        } else {
            updateUI(data)
        }
    };

    form.addEventListener("submit", formSubmit);


};

document.addEventListener("DOMContentLoaded", init);
