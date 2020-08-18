import Card, { CardProps } from './Card';
export default function OutlinedCard(props: CardProps) {
  return <Card {...props} variant="outlined" />;
}
