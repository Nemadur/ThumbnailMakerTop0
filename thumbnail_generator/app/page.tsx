'use client'

import Card from "@/components/Card";

export default function Home() {
  return (
    <div style={{margin: '50px', display: 'flex', gap: '20px'}}>
      <Card imageSrc='/w3_card.jpg' title='Warcraft 3' desc='Czasami nawet reforged' link='/wc3'></Card>
      <Card imageSrc='/homm4_card.jpg' title='Heroes 4' desc='Magia i Miecz i trochę sera' link='/homm4vs'></Card>
    </div>
  );
}
