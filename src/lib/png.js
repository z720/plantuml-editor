export function recover(data) {
    console.log('recover', data);
    pngitxt.getitxt(data, 'plantuml',function(d) {
        console.log('data', d)
    });
    return "@startuml \n :test;";
}