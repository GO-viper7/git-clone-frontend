import React,{useState,useEffect} from 'react'
import styles from './AvailableWDCs.module.css'
import { useTheme } from '@mui/material'
import AvailableWDCsCard from '../../components/AvailableWDCsCard/AvaliableWDCsCard'
import JoinWDCModal from '../../components/JoinWDCModal/JoinWDCModal'

const AvailableWDCs = () => {
    // State variables
    const theme = useTheme()
    const [wdcs, setWdcs] = useState([])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [currentWDC, setCurrentWDC] = useState({})

      // Local Variables

    // Styles
    const headerSubTitleStyle = {
        color: theme.palette.secondary.main,
    }
    const headerTitleStyle = {
        color: theme.palette.text.primary,
    }

    // Sideeffects
    useEffect(()=>{
        const url=`http://localhost:5000/api/wdc/get-all-wdcs-with-populate`;
        const fetchServices=async()=>{
            try{
                const response=await fetch(url);
                const data=await response.json();
                console.log('Popular Services: ',data);
                setWdcs(data);
            }
            catch(e){
                console.log(e);
            }
        }
        fetchServices();
    },[])

  return (
    <div className={styles.container}>
        <div className={styles.header}>
        <div className={styles.backgroundText}>Agricultural</div>
            <div className={styles.headerTitle} style={headerTitleStyle}>WDCs</div>
        </div>
        <div className={styles.dataContainer}>
            {
                wdcs.map((wdc, index) => {
                    return <AvailableWDCsCard open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} key={index} index={index} wdc={wdc} setCurrentWDC={setCurrentWDC}/>
                })
            }
        </div>
        <JoinWDCModal open={open} setOpen={setOpen} wdc={currentWDC} handleOpen={handleOpen} handleClose={handleClose} />
    </div>
  )
}

export default AvailableWDCs