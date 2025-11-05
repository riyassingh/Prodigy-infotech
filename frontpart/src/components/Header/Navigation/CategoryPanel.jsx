import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Button } from '@mui/material';
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import CategoryCollapse from '../../CategoryCollapse';

function CategoryPanel({ isopenCategory, openCategoryPanel }) {
    

    // Toggle main category
   

   

   

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <h3 className='p-3 text-[16px] font-bold text-[#282727]'>
                Shop by Categories
            </h3>

           <CategoryCollapse/>
        </Box>
    );

    return (
        <Drawer open={isopenCategory} onClose={() => openCategoryPanel(false)}>
            {DrawerList}
        </Drawer>
    );
}

export default CategoryPanel;
