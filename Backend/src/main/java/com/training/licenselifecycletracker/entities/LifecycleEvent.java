package com.training.licenselifecycletracker.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "lifecycle_events")
public class LifecycleEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private Integer eventId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "device_id")
    @JsonBackReference
    private Device device;

    @Column(name = "event_type")
    private String eventType;

    @Column(name = "event_date")
    private LocalDate eventDate;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "category", columnDefinition = "TEXT")
    private String category;
    
    // Constructors, getters, setters
}
