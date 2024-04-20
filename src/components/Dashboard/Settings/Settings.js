import SelectDropDown from '@/components/SelectDropDown';
import ToggleSwitch from '@/components/ToggleSwitch';
import { Button, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CountertopCost from './SevicingCost/Sqft/Countertop';
import FlooringCost from './SevicingCost/Sqft/Flooring';
import TilesCost from './SevicingCost/Sqft/Tiles';
import BathroomVanityCost from './SevicingCost/WithoutSqft/BathroomVanity';
import BathtubCost from './SevicingCost/WithoutSqft/Bathtub';
import CabinetCost from './SevicingCost/WithoutSqft/Cabinet';
import KitchenFaucetCost from './SevicingCost/WithoutSqft/KitchenFaucet';
import ShowerKitCost from './SevicingCost/WithoutSqft/ShowerKit';
import { apiUrl } from '@/Context/constant';
import { getServiceCost } from '@/Context/utility';

export const showSettingsOptions = [
   'Pricing',
   'Brand',
   'ColorName',
   'Description',
   'Specifications',
   'Selection',
   'PriceCalculator',
   'ServiceCosts',
];
export default function Settings() {
   const [serviceSettings, setServiceSettings] = useState('Tiles');
   const [userData, setUserData] = useState({});
   const [category, setCategory] = useState("");
   const [settings, setSettings] = useState({
      Pricing: false,
      Brand: false,
      ColorName: false,
      Description: false,
      Specifications: false,
      Selection: false,
      PriceCalculator: false,
      ServiceCosts: false,
   });

   useEffect(() => {
      const userData = typeof window !== "undefined" ? JSON.parse(window.sessionStorage.getItem('user')) : null;
      setUserData(userData);
   }, [])

   const addServiceHandler = async (data) => {
      try {
         const contractorId = userData?.id
         const apiUrlEndpoint = `${apiUrl}/api/addServiceConstSettings`;

         const serviceInputs = { settings: data, service: category, customerId: userData?.customer_id, contractorId: contractorId }

         const response = await fetch(apiUrlEndpoint, {
            method: 'POST', headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(serviceInputs)
         });
         const res = await response.json();

         if (response.ok) {
            alert(res.message)
         }
      } catch (error) {
         console.log("error", error);
      }
   }
   
   const handleToggleSettings = (e) => {
      const checked = e.target.checked;
      const name = e.target.name;
      const updatedSettings = { ...settings, [name]: checked };
      setSettings(updatedSettings);
      addServiceHandler(updatedSettings)
   };


   let content;

   // eslint-disable-next-line default-case
   switch (serviceSettings) {
      case 'Bathtub':
         content = <BathtubCost setSettings={setSettings} setCategory={setCategory} />;
         break;
      case 'Bathroom Vanity':
         content = <BathroomVanityCost setSettings={setSettings} setCategory={setCategory} />;
         break;
      case 'Tiles':
         content = <TilesCost setSettings={setSettings} setCategory={setCategory} />;
         break;
      case 'Kitchen Faucet':
         content = <KitchenFaucetCost setSettings={setSettings} setCategory={setCategory} />;
         break;
      case 'Shower Kit':
         content = <ShowerKitCost setSettings={setSettings} setCategory={setCategory} />;
         break;
      case 'Cabinets':
         content = <CabinetCost setSettings={setSettings} setCategory={setCategory} />;
         break;
      case 'Countertop':
         content = <CountertopCost setSettings={setSettings} setCategory={setCategory} />;
         break;
      case 'Flooring':
         content = <FlooringCost setSettings={setSettings} setCategory={setCategory} />;
         break;
   }

   return (
      <>
         <Stack direction="row" justifyContent="flex-end" alignItems="center" my={6} spacing={2}>
            <Typography variant="caption" fontSize={20} fontWeight="600">
               Settings
            </Typography>
            <SelectDropDown
               menuItems={[
                  'Bathroom Vanity',
                  'Tiles',
                  'Bathtub',
                  'Kitchen Faucet',
                  'Shower Kit',
                  'Cabinets',
                  'Countertop',
                  'Flooring',
               ]}
               value={serviceSettings}
               onChange={(e) => setServiceSettings(e.target.value)}
            />
         </Stack>
         <Stack direction="row" sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap-reverse', gap: 5 }}>
            <Stack spacing={3} sx={{ bgcolor: 'white', padding: 4, height: 'fit-content', flexBasis: { lg: '40%', xs: '100%' } }}>
               <Stack>
                  <Typography component="p" fontSize={25} fontWeight="500">
                     {serviceSettings} Settings
                  </Typography>
                  <Typography component="span" fontSize={14} color="gray">
                     Settings for your settings options
                  </Typography>
               </Stack>
               <List>
                  {showSettingsOptions.map((option, i) => (
                     <ListItem sx={{ padding: '8px 0' }} key={i}>
                        <ListItemText id={`switch-list-label-${option}`} primary={`Show ${option}`} />
                        <ToggleSwitch name={option} settings={settings} handleToggleSettings={handleToggleSettings} />
                     </ListItem>
                  ))}
               </List>
            </Stack>
            {content}
         </Stack>
      </>
   );
}
