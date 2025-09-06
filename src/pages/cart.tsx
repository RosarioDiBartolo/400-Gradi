import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {   ChevronLeft } from 'lucide-react'
 import { useNavigate } from 'react-router-dom';

function Cart() {

    const navigate = useNavigate();

  return (<> 
  <header className=' p-5 flex items-center gap-5'>
    <ChevronLeft 
      onClick={()=> navigate(-1)}
    size={28} strokeWidth={1.25} absoluteStrokeWidth /> <h1 className=' text-2xl'>  Cart </h1>
  </header>
    <main className=' flex-1 backdrop-blur   p-5'> 
        <Card>
            <CardHeader>
                <CardTitle>
                    Order summary
                 </CardTitle>

            </CardHeader>
            <CardContent>

            </CardContent>
        </Card>
</main> </> )
}

export default Cart