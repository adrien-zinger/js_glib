package
{
    //Ne vous occupez pas de cette partie, je détaillerai plus tard
    import flash.ui.Mouse;
 
    import flash.display.Sprite;
    import flash.events.MouseEvent;
    import flash.events.Event;
 
    //Le code
    public class souris extends Sprite
        {
        var curseur:Sprite = new Sprite();
        function souris():void
                {
                        var Map:Array = new Array();
                        var niveau:Sprite = new Sprite();
                        
                        niveau.graphics.beginFill(0xFF0000,0.5);
                        niveau.graphics.drawRect(0,0,640,480);
                        stage.addChild(niveau);
                        niveau.addEventListener(MouseEvent.MOUSE_MOVE,SourisBouge);
                        curseur.graphics.beginFill(0x00FF00,0.5);
                        curseur.graphics.drawRect(0,0,20,20);
                        niveau.addChild(curseur);
                        
                }
                
                function SourisBouge(evt:Event):void
                {//Quand la souris bouge, déplacer curseur
                        curseur.x=mouseX-10;
                        curseur.y=mouseY-10;
                }
        }
}