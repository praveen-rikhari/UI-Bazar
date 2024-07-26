import Box from "@/components/Box";
import { BsGrid1X2Fill } from "react-icons/bs";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

const styles = {
    app: {
        textAlign: 'center',
        padding: '20px',
    },
    heading: {
        color : '#333',
        fontSize: '50px',
        marginBottom: '20px',
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
    },
};

function Section2() {
    return (
        <div style={styles.app}>
            <h1 style={styles.heading}>What we provide or what<br></br> you can do for community.</h1>
            <div style={styles.cardContainer}>
                <Box icon={<BsGrid1X2Fill size={75} />} text="Free UI snippets for your personal & commercial use" />
                <Box icon={<MdOutlineConnectWithoutContact size={75} />} text="Create your own and share with community" />
                <Box icon={<FaGithub size={75} />} text="Help us to make better. Join the community." />
            </div>
        </div>
    )
}

export default Section2;