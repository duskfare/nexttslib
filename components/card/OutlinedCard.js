import Card from './Card';
/**
 * @param {import('./Card').CardProps} props 
 */
export default function OutlinedCard(props) {
    return <Card {...props} variant='outlined'/>
}