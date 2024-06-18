package com.example.avaliacaopedidos;


import java.util.Random;
import java.util.Scanner;

public class AvaliacaoPedidosApp {

    private static Random random = new Random();

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        try (Connection conn = DriverManager.getConnection(DatabaseConfig.URL, DatabaseConfig.USER, DatabaseConfig.PASSWORD)) {
            while (true) {
                System.out.println("Digite o número do pedido ou 'sair' para encerrar:");
                String numeroPedido = scanner.nextLine();

                if (numeroPedido.equalsIgnoreCase("sair")) {
                    break;
                }

                System.out.println("Digite sua avaliação para o pedido " + numeroPedido + " (1 a 5):");
                String avaliacao = scanner.nextLine();

                if (isValidAvaliacao(avaliacao)) {
                    salvarAvaliacao(conn, numeroPedido, Integer.parseInt(avaliacao));
                    String cupom = gerarCupom();
                    System.out.println("Obrigado pela sua avaliação! Aqui está seu cupom de desconto: " + cupom);
                } else {
                    System.out.println("Avaliação inválida. Por favor, insira um valor entre 1 e 5.");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        scanner.close();
        System.out.println("Aplicativo encerrado.");
    }

    private static boolean isValidAvaliacao(String avaliacao) {
        try {
            int valor = Integer.parseInt(avaliacao);
            return valor >= 1 && valor <= 5;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private static void salvarAvaliacao(Connection conn, String numeroPedido, int avaliacao) throws SQLException {
        String sql = "INSERT INTO avaliacoes (numero_pedido, avaliacao) VALUES (?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, numeroPedido);
            pstmt.setInt(2, avaliacao);
            pstmt.executeUpdate();
        }
    }

    private static String gerarCupom() {
        int numeroCupom = random.nextInt(999999);
        return String.format("CUPOM%06d", numeroCupom);
    }
}
