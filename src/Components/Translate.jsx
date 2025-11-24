import React from 'react'
import { useTranslation } from 'react-i18next';





function Translate() {


     const { t, i18n } = useTranslation();


     
  return (
   <select
    onChange={(e) => i18n.changeLanguage(e.target.value)}
    value={i18n.language}
    style={{
        padding: '10px',
        borderRadius: '5px',
        marginTop: '10px',
        width: '250px' // increase the width as needed
    }}
>
    <option value="en">English</option>
    <option value="yo">Yoruba</option>
    <option value="ig">Igbo</option>
    <option value="ha">Hausa</option>
    <option value="chi">Chinese</option>
    <option value="ij">Ijaw</option>
    <option value="fr">French</option>
    <option value="ido">Idoma</option>
    <option value="ifk">Efik</option>
    <option value="ebira">Ebira</option>
    <option value="ind">Indian</option>
    <option value="gh">Ghana</option>
    <option value="sa">South Africa</option>
    <option value="tz">Tanzania</option>
    <option value="ru">Russia</option>
    <option value="kr">Korea</option>
    <option value="gb">Gambia Madinka</option>
    <option value="pg">Pidgin</option>
</select>

  )
}

export default Translate