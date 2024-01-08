// SidebarData.js

import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import PeopleIcon from '@mui/icons-material/People';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PaymentIcon from '@mui/icons-material/Payment';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ScheduleIcon from '@mui/icons-material/Schedule';

import BusinessIcon from '@mui/icons-material/Business';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import AssignmentIcon from '@mui/icons-material/Assignment';



export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/sidebar"
    },
    {
        title: "Sections",
        icon: <BusinessIcon />,
        link: "/sections"
    },
    {
        title: "Additional Services",
        icon: <EmojiTransportationIcon />,
        link: "/addservices"
    },
    {
        title: "Attractions",
        icon: <MenuBookIcon />,
        link: "/attractions"
    },
    {
        title: "Users",
        icon: <PeopleIcon />,
        link: "/users"
    },
    {
        title: "Tickets",
        icon: <ConfirmationNumberIcon />,
        link: "/tickets"
    },
    {
        title: "Payments",
        icon: <PaymentIcon />,
        link: "/payments"
    },
    {
        title: "Employees",
        icon: <PeopleIcon />,
        link: "/employees"
    },
    {
        title: "Schedules",
        icon: <ScheduleIcon />,
        link: "/schedules"
    },
    
    
]