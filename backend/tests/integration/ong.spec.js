const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');


describe('ONG', () => {
    //ante de começar o test ele vai execulta a migrate (tabela)
    //rollback é para reiniciar a tabela e apagar os dados
    
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });
    //aqui é o teste
    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            //o tipo de requisição que será feito POST, GET, DELET ou PUT
            .post('/ongs')
            //o que será escrito e onde
            .send({
                nome:"TESTE agora vai2",
                email:"apad@gmail.com",
                whatsapp:"11946296036",
                city: "Osasco",
                uf:"SP"
            });
        //apos o test ele vai finalizar qualquer processo que ficou rodando
        afterEach(async () => {
            await connection.destroy();
        });
        //aqui colocamos a resposta esperada 
        //EU ESPERO QUE .... ONDE ... QUANDO ...
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveLength(8);
    });
});

//se for testar uma rota que precise de um cabeçalho 
//.set('Authorization','codigo')