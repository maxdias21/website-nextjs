import styles from "./PatchFields.module.css";

import {STATES_CHOICES} from "../../lib/state_choices";
import {useQueryClient} from "@tanstack/react-query";

function PatchFieldsProfile({isLoading, isError, isSuccess}) {
    const queryClient = useQueryClient();
    const profileQuery = queryClient.getQueryData(["leftPersonDetail"]);
    const defaultCurrentCity = profileQuery?.current_state ? profileQuery?.current_state : "AC";
    const defaultBirthCity = profileQuery?.birth_state ? profileQuery?.birth_state : "AC";

    return (
        <fieldset className={styles.fieldset} disabled={isLoading}>
            <div className={styles.field}>
                <label htmlFor="state">Estado onde você nasceu</label>
                <select className={styles.select} defaultValue={defaultBirthCity} id="state" name="birth_state">
                    {STATES_CHOICES.map(({label, value}) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            </div>
            <div className={styles.field}>
                <label htmlFor="city">Estado onde você mora atualmente</label>
                <select className={styles.select} defaultValue={defaultCurrentCity} id="city" name="current_state">
                    {STATES_CHOICES.map(({label, value}) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            </div>
            <div className={styles.field}>
                <label htmlFor="gender">Seu gênero</label>
                <select className={styles.select} name="gender" id="gender">
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                    <option value="O">Outro</option>
                </select>

                <hr className={styles.hr}/>
                {isError}
                {isSuccess}
            </div>

        </fieldset>
    );
}

export default PatchFieldsProfile;