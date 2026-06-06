#include<bits/stdc++.h>
#include <windows.h>
using namespace std;
void enableVTMode() {
    HANDLE hOut = GetStdHandle(STD_OUTPUT_HANDLE);
    DWORD dwMode = 0;
    GetConsoleMode(hOut, &dwMode);
    dwMode |= ENABLE_VIRTUAL_TERMINAL_PROCESSING;
    SetConsoleMode(hOut, dwMode);
}
void rgb(int r,int g,int b){
    cout<<"\033[38;2;"<<r<<";"<<g<<";"<<b<<"m";
}
void hex(string s){
    if(s[0]=='#'){
        int r,g,b;
        sscanf(s.c_str(),"#%02x%02x%02x",&r,&g,&b);
        rgb(r,g,b);
    }
}
void reset(){
    cout<<"\033[0m";
}
const vector<string>num[10]={
    {
        " ###} ",
        "#    #",
        "[   *#",
        "#  & #",
        "#/   #",
        "#    #",
        " @##% "
    },
    {
        "   &  ",
        "  &&  ",
        " # &  ",
        "   &  ",
        "   &  ",
        "   &  ",
        "%$%@#%"
    },
    {
        "<#### ",
        "     #",
        "    &/",
        "   *  ",
        "  /   ",
        " %    ",
        "##?##/"
    },
    {
        "@#### ",
        "    *#",
        "     %",
        "  <#&%",
        "     %",
        "    *#",
        "&####/"
    },
    {
        "   %  ",
        "  %&  ",
        " & %  ",
        "%  |  ",
        "#%&@#%",
        "   &  ",
        "   %  "
    },
    {
        "&#$%#>",
        "%     ",
        "%&%$% ",
        "    *#",
        "     %",
        "     #",
        "<#&#@/"
    },
    {
        "/####>",
        "%     ",
        "%     ",
        "##%&@#",
        "%   *#",
        "%   *#",
        " %#&# "
    },
    {
        "<#&@?%",
        "    & ",
        "   #  ",
        "  &   ",
        "  $   ",
        "  %   ",
        "  V   "
    },
    {
        " #&$#L",
        "%    #",
        "%    ?",
        "#-*^=#",
        "%    ?",
        "@    #",
        " #+## "
    },
    {
        " #### ",
        "%    #",
        "#    %",
        " #@#&#",
        "     #",
        "     %",
        "<###&/"
    }
};
const vector<string>colon={
    "  ",
    "鍦",
    "悆",
    "  ",
    "灞",
    "敯",
    "  "
};
const vector<string>nocolon={
    "  ",
    "++",
    "++",
    "  ",
    "++",
    "++",
    "  "
};
const vector<string> titleArt = {
    "   ________    ____  ________ __   ",
    "  / ____/ /   / __ \\/ ____/ //_/   ",
    " / /   / /   / / / / /   / ,<      ",
    "/ /___/ /___/ /_/ / /___/ /| |     ",
    "\\____/_____/\\____/\\____/_/ |_|     "
};
void draw(const vector<string>& v,int x,int y){
    for(auto i:v){
        cout<<"\033["<<y++<<";"<<x<<"H";
        cout<<i;
    }
}
void Clock(){
    auto now = std::chrono::system_clock::now();
    auto time=chrono::system_clock::to_time_t(now);
    std::tm local_tm;
    localtime_s(&local_tm, &time);
    //
    int h=local_tm.tm_hour;//时
    int min=local_tm.tm_min;//分
    int s=local_tm.tm_sec;//秒
    int year=local_tm.tm_year + 1900;//年
    int mon=local_tm.tm_mon + 1;//月
    int d= local_tm.tm_mday;//日
    //
    static int lh=-1;
    static int lmin=-1;
    static int ld=-1;
    static int ls=-1;
    /*if(h==lh && min==lmin && d==ld){
        return;
    }*/
    lh=h;
    lmin=min;
    ld=d;
    //
    int h1=h/10,h2=h%10;//小时的十位以及个位
    int m1=min/10,m2=min%10;//分钟的十位以及个位
    //
    string blank(40,' ');//空行
    for(int i=3;i<=9;i++){
        cout<<"\033["<<i<<";5H"<<blank;
    }
    cout<<"\033[11;5H"<<blank;
    int x=5;
    hex("#3DF8F8");
    draw(num[h1],x,1);
    x+=8;
    draw(num[h2],x,1);
    x+=8;
    //
    hex("#E23AFB");
    if(s%2==0){
        draw(colon,x,1);
    }else{
        draw(nocolon,x,1);
    }
    //
    x+=4;
    hex("#3DF8F8");
    draw(num[m1],x,1);
    x+=8;
    draw(num[m2],x,1);
    cout<<"\033[9;5H";
    printf("%d-%02d-%02d",year,mon,d);
}
int main(){
    system("chcp 65001 > nul");
    enableVTMode();
    cout << "\033[2J";
    cout << "\033[?25l";
    hex("#E23AFB");
    draw(titleArt,45,2);
    while(true){
        Clock();
        this_thread::sleep_for(chrono::seconds(1));
    }
    return 0;
}
/*
   ________    ____  ________ __
  / ____/ /   / __ \/ ____/ //_/
 / /   / /   / / / / /   / ,<   
/ /___/ /___/ /_/ / /___/ /| |  
\____/_____/\____/\____/_/ |_|  
*/