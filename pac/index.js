//主程序,业务逻辑
(function(){
	var _DATA = [		//地图数据
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
		[1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
		[1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
		[1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
		[1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,1,1,1,2,2,1,1,1,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1],
		[0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0],
		[1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
		[1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
		[1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1],
		[1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
		[1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
		[1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
		[1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	],
	_GOODS = {			//能量豆
		'1,3':1,
		'26,3':1,
		'1,23':1,
		'26,23':1
	},
	_COS = [1,0,-1,0],
	_SIN = [0,1,0,-1],
	_COLOR = ['#F00','#F93','#0CF','#F9C'],//红,橙,
	_LIFE = 3,
	_SCORE = 0;		//得分

	var game = new Game('canvas');
	//启动页
	(function(){
		var stage = game.createStage();
		//logo
		stage.createItem({
			x:game.width/2,
			y:game.height*.45,
			width:100,
			height:100,
			frames:3,
			draw:function(context){
				var t = Math.abs(5-this.times%10);
				context.fillStyle = '#FFE600';
				context.beginPath();
				context.arc(this.x,this.y,this.width/2,t*.04*Math.PI,(2-t*.04)*Math.PI,false);
				context.lineTo(this.x,this.y);
				context.closePath();
				context.fill();
				context.fillStyle = '#000';
				context.beginPath();
				context.arc(this.x+5,this.y-27,7,0,2*Math.PI,false);
				context.closePath();
				context.fill();
			}
		});
		//游戏名
		stage.createItem({
			x:game.width/2,
			y:game.height*.6,
			draw:function(context){
				context.font = 'bold 42px Helvetica';
				context.textAlign = 'center';
				context.textBaseline = 'middle';
				context.fillStyle = '#FFF';
				context.fillText('Pac-Man',this.x,this.y);
			}
		});
		//版权信息
		stage.createItem({
			x:game.width-12,
			y:game.height-5,
			draw:function(context){
				context.font = '14px Helvetica';
				context.textAlign = 'right';
				context.textBaseline = 'bottom';
				context.fillStyle = '#AAA';
				context.fillText('© passer-by.com',this.x,this.y);
			}
		});
		//事件绑定
		stage.bind('keydown',function(e){
			switch(e.keyCode){
				case 13:
				case 32:
				game.nextStage();
				break;
			}
		});
	})();
	//游戏主程序
	(function(){
		var stage,map,beans,player,times;
		stage = game.createStage({
			update:function(){
				var stage = this;
				if(stage.status==1){								//场景正常运行
					items.forEach(function(item){
						if(map&&!map.get(item.coord.x,item.coord.y)&&!map.get(player.coord.x,player.coord.y)){
							var dx = item.x-player.x;
							var dy = item.y-player.y;
							if(dx*dx+dy*dy<750&&item.status!=4){ 物体检测="" if(item.status="=3){" item.status="4;" _score="" +="10;" }else{="" stage.status="3;" stage.timeout="30;" }="" });="" if(json.stringify(beans.data).indexof(0)<0){="" 当没有物品的时候，进入结束画面="" game.nextstage();="" }else="" if(stage.status="=3){" 场景临时状态="" if(!stage.timeout){="" _life--;="" if(_life){="" stage.resetitems();="" return="" false;="" 绘制地图="" map="stage.createMap({" x:60,="" y:10,="" data:_data,="" cache:true,="" draw:function(context){="" context.linewidth="2;" for(var="" j="0;" j<this.y_length;="" j++){="" i="0;" i<this.x_length;="" i++){="" var="" value="this.get(i,j);" if(value){="" code="[0,0,0,0];" if(this.get(i+1,j)&&!(this.get(i+1,j-1)&&this.get(i+1,j+1)&&this.get(i,j-1)&&this.get(i,j+1))){="" code[0]="1;" if(this.get(i,j+1)&&!(this.get(i-1,j+1)&&this.get(i+1,j+1)&&this.get(i-1,j)&&this.get(i+1,j))){="" code[1]="1;" if(this.get(i-1,j)&&!(this.get(i-1,j-1)&&this.get(i-1,j+1)&&this.get(i,j-1)&&this.get(i,j+1))){="" code[2]="1;" if(this.get(i,j-1)&&!(this.get(i-1,j-1)&&this.get(i+1,j-1)&&this.get(i-1,j)&&this.get(i+1,j))){="" code[3]="1;" if(code.indexof(1)="">-1){
								context.strokeStyle=value==2?"#FFF":"#09C";
								var pos = this.coord2position(i,j);
								switch(code.join('')){
									case '1100':
										context.beginPath();
										context.arc(pos.x+this.size/2,pos.y+this.size/2,this.size/2,Math.PI,1.5*Math.PI,false);
										context.stroke();
										context.closePath();
										break;
									case '0110':
										context.beginPath();
										context.arc(pos.x-this.size/2,pos.y+this.size/2,this.size/2,1.5*Math.PI,2*Math.PI,false);
										context.stroke();
										context.closePath();
										break;
									case '0011':
										context.beginPath();
										context.arc(pos.x-this.size/2,pos.y-this.size/2,this.size/2,0,.5*Math.PI,false);
										context.stroke();
										context.closePath();
										break;
									case '1001':
										context.beginPath();
										context.arc(pos.x+this.size/2,pos.y-this.size/2,this.size/2,.5*Math.PI,1*Math.PI,false);
										context.stroke();
										context.closePath();
										break;
									default:
										var dist = this.size/2;
										code.forEach(function(v,index){
											if(v){
												context.beginPath();
												context.moveTo(pos.x,pos.y);
												context.lineTo(pos.x-_COS[index]*dist,pos.y-_SIN[index]*dist);
												context.stroke();
												context.closePath();							
											}
										});
								}
							}
						}
					}
				}
			}
		});
		//物品地图
		beans = stage.createMap({
			x:60,
			y:10,
			data:_DATA,
			frames:8,
			draw:function(context){
				for(var j=0; j<this.y_length; j++){="" for(var="" i="0;" i<this.x_length;="" i++){="" if(!this.get(i,j)){="" var="" pos="this.coord2position(i,j);" context.fillstyle="#F5F5DC" ;="" if(_goods[i+','+j]){="" context.beginpath();="" context.arc(pos.x,pos.y,3+this.times%2,0,2*math.pi,true);="" context.fill();="" context.closepath();="" }else{="" context.fillrect(pos.x-2,pos.y-2,4,4);="" }="" });="" 得分="" stage.createitem({="" x:690,="" y:100,="" draw:function(context){="" context.font="bold 28px Helvetica" context.textalign="left" context.textbaseline="bottom" context.filltext('score',this.x,this.y);="" context.filltext(_score,this.x+12,this.y);="" 状态文字="" y:320,="" frames:25,="" if(stage.status="=2&&this.times%2){" context.filltext('pause',this.x,this.y);="" 生命值="" x:705,="" y:540,="" width:30,="" height:30,="" x="this.x+40*i,y=this.y;" context.arc(x,y,this.width="" 2,.15*math.pi,-.15*math.pi,false);="" context.lineto(x,y);="" npc="" orientation:3,="" color:_color[i],="" location:map,="" coord:{x:12+i,y:14},="" vector:{x:12+i,y:14},="" type:2,="" frames:10,="" speed:1,="" timeout:math.floor(math.random()*120),="" update:function(){="" new_map;="" if(this.status="=3&&!this.timeout){" this.status="1;" if(!this.coord.offset){="" 到达坐标中心时计算="" if(!this.timeout){="" 定时器="" new_map="JSON.parse(JSON.stringify(map.data).replace(/2/g,0));" id="this._id;" items.foreach(function(item){="" if(item._id!="id&&item.status==1){" npc将其它所有还处于正常状态的npc当成一堵墙="" new_map[item.coord.y][item.coord.x]="1;" this.path="map.finder({" map:new_map,="" start:this.coord,="" end:player.coord="" if(this.path.length){="" this.vector="this.path[0];" }else="" start:player.coord,="" end:this.coord,="" type:'next'="" end:this._params.coord="" 是否转变方向="" if(this.vector.change){="" this.coord.x="this.vector.x;" this.coord.y="this.vector.y;" this.x="pos.x;" this.y="pos.y;" 方向判定="" if(this.vector.x="">this.coord.x){
							this.orientation = 0;
						}else if(this.vector.x<this.coord.x){ this.orientation="2;" }else="" if(this.vector.y="">this.coord.y){
							this.orientation = 1;
						}else if(this.vector.y<this.coord.y){ this.orientation="3;" }="" this.x="" +="this.speed*_COS[this.orientation];" this.y="" },="" draw:function(context){="" var="" issick="false;" if(this.status="=3){">80||this.times%2?true:false;
					}
					if(this.status!=4){
						context.fillStyle = isSick?'#BABABA':this.color;
						context.beginPath();
						context.arc(this.x,this.y,this.width*.5,0,Math.PI,true);
						switch(this.times%2){
							case 0:
							context.lineTo(this.x-this.width*.5,this.y+this.height*.4);
							context.quadraticCurveTo(this.x-this.width*.4,this.y+this.height*.5,this.x-this.width*.2,this.y+this.height*.3);
							context.quadraticCurveTo(this.x,this.y+this.height*.5,this.x+this.width*.2,this.y+this.height*.3);
							context.quadraticCurveTo(this.x+this.width*.4,this.y+this.height*.5,this.x+this.width*.5,this.y+this.height*.4);
							break;
							case 1:
							context.lineTo(this.x-this.width*.5,this.y+this.height*.3);
							context.quadraticCurveTo(this.x-this.width*.25,this.y+this.height*.5,this.x,this.y+this.height*.3);
							context.quadraticCurveTo(this.x+this.width*.25,this.y+this.height*.5,this.x+this.width*.5,this.y+this.height*.3);
							break;
						}
						context.fill();
						context.closePath();
					}
					context.fillStyle = '#FFF';
					if(isSick){
						context.beginPath();
						context.arc(this.x-this.width*.15,this.y-this.height*.21,this.width*.08,0,2*Math.PI,false);
						context.arc(this.x+this.width*.15,this.y-this.height*.21,this.width*.08,0,2*Math.PI,false);
						context.fill();
						context.closePath();
					}else{
						context.beginPath();
						context.arc(this.x-this.width*.15,this.y-this.height*.21,this.width*.12,0,2*Math.PI,false);
						context.arc(this.x+this.width*.15,this.y-this.height*.21,this.width*.12,0,2*Math.PI,false);
						context.fill();
						context.closePath();
						context.fillStyle = '#000';
						context.beginPath();
						context.arc(this.x-this.width*(.15-.04*_COS[this.orientation]),this.y-this.height*(.21-.04*_SIN[this.orientation]),this.width*.07,0,2*Math.PI,false);
						context.arc(this.x+this.width*(.15+.04*_COS[this.orientation]),this.y-this.height*(.21-.04*_SIN[this.orientation]),this.width*.07,0,2*Math.PI,false);
						context.fill();
						context.closePath();
					}
				}
			});
		}
		items = stage.getItemsByType(2);
		//主角
		player = stage.createItem({
			width:30,
			height:30,
			type:1,
			location:map,
			coord:{x:13.5,y:23},
			orientation:2,
			speed:2,
			frames:10,
			update:function(){
				var coord = this.coord;
				if(!coord.offset){
					if(this.control.orientation!='undefined'){
						if(!map.get(coord.x+_COS[this.control.orientation],coord.y+_SIN[this.control.orientation])){
							this.orientation = this.control.orientation;
						}
					}
					this.control = {};
					var value = map.get(coord.x+_COS[this.orientation],coord.y+_SIN[this.orientation]);
					if(value==0){
						this.x += this.speed*_COS[this.orientation];
						this.y += this.speed*_SIN[this.orientation];
					}else if(value</this.coord.y){></this.coord.x){></this.y_length;></750&&item.status!=4){>