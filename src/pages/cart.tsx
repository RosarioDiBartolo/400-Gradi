import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {   ChevronLeft } from 'lucide-react'
 import { useNavigate } from 'react-router-dom';

 
function Cart() {

    const navigate = useNavigate();

  return (<> 
  <header className=' bg-background sticky top-0 backdrop-blur-md z-50 text-foreground p-5 flex items-center gap-5'>
    <ChevronLeft 
      onClick={()=> navigate(-1)}
    size={28} strokeWidth={1.25} absoluteStrokeWidth /> <h1 className=' text-2xl'>  Cart </h1>
  </header>
    <main className=' flex-1 bg-background   p-5'> 
        <Card className=' rounded-3xl border-0'>
            <CardHeader>
                <CardTitle>
                    Sommario ordini
                 </CardTitle>

            </CardHeader>
            <CardContent>

            </CardContent>
        </Card>
</main> </> )
}

export default Cart