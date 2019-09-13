package pl.coderslab.charity.donation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DonationRepository extends JpaRepository<Donation, Long> {

    @Query(value = "SELECT COUNT(DISTINCT institution) FROM Donation")
    int quantitySupportedInstitutions();

    @Query(value = "SELECT SUM(quantity) FROM Donation")
    int quantitySumDonations();
}
